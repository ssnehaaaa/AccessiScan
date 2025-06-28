import puppeteer from "puppeteer";
import { createRequire } from "module";
import Report from "../models/Report.js";
// Needed to use `require.resolve` inside ES modules
const require = createRequire(import.meta.url);

export const analyzeAccessibility = async (req, res) => {
  const { url } = req.body;
  const userId = req.user?._id;
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    // ✅ Inject axe-core into page using a valid file path
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });

    const result = await page.evaluate(async () => {
      const auditResults = await window.axe.run();


      const serializeNodes = (nodes) => {
        if (!nodes) return [];
        return nodes.map(node => ({
          html: node.html,
          target: node.target, 
          any: node.any ? node.any.map(item => ({ id: item.id, message: item.message, data: item.data })) : [],
          all: node.all ? node.all.map(item => ({ id: item.id, message: item.message, data: item.data })) : [],
          none: node.none ? node.none.map(item => ({ id: item.id, message: item.message, data: item.data })) : [],
        }));
      };

      return {
        violations: auditResults.violations.map(violation => ({
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          help: violation.help,
          helpUrl: violation.helpUrl,
          nodes: serializeNodes(violation.nodes),
          // Add any other simple, serializable top-level properties of a violation you need
          tags: violation.tags,
        })),
        passes: auditResults.passes.map(pass => ({
          id: pass.id,
          description: pass.description,
          help: pass.help,
          helpUrl: pass.helpUrl,
          nodes: serializeNodes(pass.nodes),
          // Add any other simple, serializable top-level properties of a pass you need
          tags: pass.tags,
        })),
        incomplete: auditResults.incomplete.map(item => ({
          id: item.id,
          description: item.description,
          help: item.help,
          helpUrl: item.helpUrl,
          nodes: serializeNodes(item.nodes),
          // Add any other simple, serializable top-level properties of an incomplete item you need
          tags: item.tags,
        })),
        // Include other top-level serializable properties from auditResults if needed
        url: auditResults.url,
        timestamp: auditResults.timestamp,
        toolOptions: auditResults.toolOptions, // Assuming this is serializable
        // ... and any other top-level properties that are not circular
      };
    });

    await browser.close();

    const savedReport = await Report.create({
      user: userId,
      type: "url",
      source: url,
      results: result,
      createdAt: new Date()
    });

    res.status(200).json({
  url: result.url,
  violations: result.violations,
  passes: result.passes,
  incomplete: result.incomplete,
  timestamp: result.timestamp || new Date(),
}); 
  } catch (error) {
    console.error("❌ Axe-core error:", error);
    res.status(500).json({
      message: "Accessibility analysis failed",
      error: error.message,
    });
  }
};


