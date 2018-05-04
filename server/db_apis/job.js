const database = require('../services/database.js')

const baseQuery =
`select id "id",
groupId "groupId",
title "title",
url "url",
description "description",
requirement "requirement",
benefit "benefit",
howToApply "howToApply",
imgLink "imgLink",
status "status",
createdAdmin "createdAdmin",
createdAt "createdAt"
from jobs`;
// jobs to avoid `job` - the key word of oracle

async function find(context) {
	let query = baseQuery;
	const binds = {}
	if (context.url) {
		binds.url = context.url;
		query += `\nwhere url = :url`;
	}
	const result = await database.simpleExecute(query, binds);
	return result.rows;
}

module.exports.find = find;