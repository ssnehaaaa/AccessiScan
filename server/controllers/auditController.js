import puppeteer , { executablePath } from "puppeteer";
import { createRequire } from "module";
import Report from "../models/Report.js";

const require = createRequire(import.meta.url);

export const analyzeAccessibility = async (req, res) => {
  const { url } = req.body;
  const userId = req.user?._id;

  console.log("📥 Incoming analyze request for:", url);
  console.log("🔐 User ID:", userId);

  if (!url || !url.startsWith("http")) {
    console.warn("⚠️ Invalid URL received:", url);
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    console.log("🚀 Puppeteer launched successfully");

    const page = await browser.newPage();
    console.log("🧾 New page created, navigating to:", url);

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    console.log("🌐 Page loaded:", url);

    const axePath = require.resolve("axe-core/axe.min.js");
    console.log("🛠️ Resolved axe-core path:", axePath);

    await page.addScriptTag({ path: axePath });

    console.log("✅ axe-core injected into page");

    const result = await page.evaluate(async () => {
      const auditResults = await window.axe.run();

      const serializeNodes = (nodes) => {
        if (!nodes) return [];
        return nodes.map(node => ({
          html: node.html,
          target: node.target,
          any: node.any ? node.any.map(item => ({
            id: item.id,
            message: item.message,
            data: item.data
          })) : [],
          all: node.all ? node.all.map(item => ({
            id: item.id,
            message: item.message,
            data: item.data
          })) : [],
          none: node.none ? node.none.map(item => ({
            id: item.id,
            message: item.message,
            data: item.data
          })) : [],
        }));
      };

      return {
        violations: auditResults.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          help: v.help,
          helpUrl: v.helpUrl,
          nodes: serializeNodes(v.nodes),
          tags: v.tags,
        })),
        passes: auditResults.passes.map(p => ({
          id: p.id,
          description: p.description,
          help: p.help,
          helpUrl: p.helpUrl,
          nodes: serializeNodes(p.nodes),
          tags: p.tags,
        })),
        incomplete: auditResults.incomplete.map(i => ({
          id: i.id,
          description: i.description,
          help: i.help,
          helpUrl: i.helpUrl,
          nodes: serializeNodes(i.nodes),
          tags: i.tags,
        })),
        url: auditResults.url,
        timestamp: auditResults.timestamp,
        toolOptions: auditResults.toolOptions,
      };
    });

    await browser.close();
    console.log("📦 Audit completed. Closing browser.");

    const savedReport = await Report.create({
      user: userId,
      type: "url",
      source: url,
      results: result,
      createdAt: new Date(),
    });

    console.log("📝 Report saved to DB:", savedReport._id);

    res.status(200).json({
      url: result.url,
      violations: result.violations,
      passes: result.passes,
      incomplete: result.incomplete,
      timestamp: result.timestamp || new Date(),
    });
  } catch (error) {
    console.error("❌ Error during analysis:", error.message);
    res.status(500).json({
      message: "Accessibility analysis failed",
      error: error.message,
    });
  }
};
