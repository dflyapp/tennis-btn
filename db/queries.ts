import { asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from './db'
import {
  SelectCount,
  SelectUser,
  postsTable,
  usersTable,
  countsTable,
  SelectPlayerFemale,
  playersFemaleTable,
  SelectPlayerMale,
  playersMaleTable
} from './schema'

export async function getPlayersFemale(): Promise<Array<SelectPlayerFemale>> {
  return db.select().from(playersFemaleTable)
}

export async function getCountsById(id: SelectCount['id']): Promise<
  Array<{
    id: number
    title: string
    count: number | null
  }>
> {
  return db.select().from(countsTable).where(eq(countsTable.id, id))
}

export async function increaseCountsById(id: SelectCount['id']) {
  const countRes = await db
    .select()
    .from(countsTable)
    .where(eq(countsTable.id, id))

  const count = countRes[0]?.count ? countRes[0]?.count + 1 : 0
  await db.update(countsTable).set({ count }).where(eq(countsTable.id, id))
}

export async function updateFemalePlayerById(id: SelectPlayerFemale['id'], data: {
  name: string
  max: number
  min: number
  phone?: string
}) {
  await db
    .update(playersFemaleTable)
    .set(data)
    .where(eq(playersFemaleTable.id, id))
}

export async function updateMalePlayerById(id: SelectPlayerMale['id'], data: {
  name: string
  max: number
  min: number
  phone?: string
}) {
  await db
    .update(playersMaleTable)
    .set(data)
    .where(eq(playersMaleTable.id, id))
}

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number
    name: string
    age: number
    email: string
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id))
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    postsCount: number
    id: number
    name: string
    age: number
    email: string
  }>
> {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
}

export async function getPostsForLast24Hours(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    id: number
    title: string
  }>
> {
  return db
    .select({
      id: postsTable.id,
      title: postsTable.title,
    })
    .from(postsTable)
    .where(
      between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`)
    )
    .orderBy(asc(postsTable.title), asc(postsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
}
