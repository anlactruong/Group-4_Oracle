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
from jobs where status = 1`;
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

async function findList() {
	let myquery = `select * from jobGroups where status = 1`;
	const listJobGroup = (await database.simpleExecute(myquery)).rows;
	result = []
	for (i=0; i<listJobGroup.length; i++) {
		let myquery2 = `select url "url", title "title" from jobs where status = 1 and groupId = ` + listJobGroup[i].ID;
		const listJob = (await database.simpleExecute(myquery2)).rows;
		result.push({
			id: listJobGroup[i].ID,
			title: listJobGroup[i].TITLE,
			imgLink: listJobGroup[i].IMGLINK,
			listJobs: listJob
		});
	}
	return result;
}

module.exports.find = find;
module.exports.findList = findList;