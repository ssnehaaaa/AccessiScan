import Report from "../models/Report.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const reports = await Report.find({ user: userId }).sort({ createdAt: -1 });

    const totalScans = reports.length;
    const issuesFound = reports.reduce((acc, report) => acc + (report.results?.violations?.length || 0), 0);

    const complianceScores = reports.map(r =>
      Math.max(0, 100 - (r.results?.violations?.length || 0) * 5)
    );
    const complianceScore = complianceScores.length
      ? Math.round(complianceScores.reduce((a, b) => a + b) / complianceScores.length)
      : 0;

    const recentActivity = reports.slice(0, 3).map(report => ({
      url: report.source,
      time: report.createdAt,
    }));

    const issueMap = {};
    reports.forEach(report => {
      (report.results?.violations || []).forEach(v => {
        issueMap[v.id] = (issueMap[v.id] || 0) + 1;
      });
    });

    const topIssues = Object.entries(issueMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, count]) => ({
        id,
        label: id,
        count,
      }));

    const graphData = reports.slice(-6).reverse().map((r, idx) => ({
      month: `M${idx + 1}`,
      score: Math.max(0, 100 - (r.results?.violations?.length || 0) * 5),
    }));

    res.status(200).json({
      totalScans,
      issuesFound,
      complianceScore,
      recentActivity,
      topIssues,
      graphData,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
