const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export const retrieveDatabase = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB_LIBRARY_ID,
  })
  return response.results
}

export const retrievePage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const retrieveBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })
  return response.results
}

export const retrieveId = async (slug) => {
  const database = await retrieveDatabase()
  let id = ''
  for (let i = 0; i < database.length; i++) {
    if (database[i].properties.slug.rich_text[0].plain_text === slug) {
      id = database[i].id
    }
  }
  return id
}
