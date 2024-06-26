import 'dotenv/config'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const dbName = 'mydatabase'
const client = new MongoClient(url)

async function main() {
  try {
    await client.connect()
    console.log('Connected to database')

    const db = client.db(dbName)
    const collection = db.collection('documents')

    // CREATE
    const insertResult = await collection.insertMany([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 }
    ])
    console.log('Inserted documents =>', insertResult)

    // READ
    const findResult = await collection.find({}).toArray()
    console.log('Found documents =>', findResult)

    // UPDATE
    const updateResult = await collection.updateOne({ name: 'Alice' }, { $set: { age: 26 } })
    console.log('Updated document =>', updateResult)

    // DELETE
    const deleteResult = await collection.deleteOne({ name: 'Charlie' })
    console.log('Deleted document =>', deleteResult)
  } finally {
    await client.close()
  }
}

main().catch(console.error)
