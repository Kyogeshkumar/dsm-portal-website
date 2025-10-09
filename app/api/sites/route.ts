const sql = neon(url);
const rows = await sql<SiteRow>`
  SELECT site_id, site_name
  FROM sites
  ORDER BY site_name;
`;

return NextResponse.json({ sites: rows });
