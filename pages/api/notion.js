const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const retrieveDatabase = async (req, res) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB_LIBRARY_ID,
  })
  res.status(200).json({ response })
}
export default retrieveDatabase

// const response = await notion.databases.query({
//   database_id: process.env.NOTION_DB_LIBRARY_ID,
// });
// const response = await notion.pages.retrieve({ page_id: pageId });
// return response;
// const response = await notion.blocks.children.list({
//   block_id: "02dec206-1586-444d-80da-12c43cdf1b2a",
//   page_size: 50,
// });
// const response = await notion.search({
//   query: 'experiment-without-limits-08-11-22',
//   filter: {
//     property: 'object',
//     value: 'page',
//   },
// })
// const getId = response.results[0].id
