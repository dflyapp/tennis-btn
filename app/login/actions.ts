'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from 'utils/supabase/server'
import * as fs from 'fs'
import * as path from 'path'
import * as xlsx from 'node-xlsx'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard/male')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signout() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function revalidate() {
  revalidatePath('/bang-diem/nam')
  revalidatePath('/bang-diem/nu')
}

function print(PlayerList: any, idx: number) {
  console.log('id: ', PlayerList[idx][0])
  console.log('name: ', PlayerList[idx][2])
  console.log('max: ', PlayerList[idx][3])
  console.log('min: ', PlayerList[idx][4])
  console.log('sdt: ', PlayerList[idx][5])
}

export async function migrate() {
  const supabase = createClient()
  const CONFIG = {
    male: {
      index: 0,
      schema: 'players_male',
    },
    female: {
      index: 1,
      schema: 'players_female',
    },
  }
  const CurrentTable = 'male' as 'male' | 'female'

  const fileContents = await fs.readFileSync(
    path.join(process.cwd(), 'scripts/data.xlsx')
  )

  const res = xlsx.parse(fileContents)
  let PlayerList = res[CONFIG[CurrentTable].index].data as any // 0:male and 1:female

  // filter rows that have id > 0 (not blank)
  PlayerList = PlayerList.filter((e: any) => e[0] > 0)

  // print(PlayerList, 0) // test first player
  // console.log(PlayerList.length, 'length of the list')

  // migrate
  // for (let i = 1001; i <= PlayerList.length; i++) {
  //   const { error } = await supabase.from(CONFIG[CurrentTable].schema).upsert({
  //     id: PlayerList[i][0],
  //     name: PlayerList[i][2],
  //     max: PlayerList[i][3],
  //     min: PlayerList[i][4],
  //     phone: !!PlayerList[i][5] ? String(PlayerList[i][5]) : null,
  //     updated_at: new Date(),
  //   })
  //   if (error) {
  //     console.log(error.message)
  //   }
  //   console.log('updated: ', PlayerList[i][0], ' : ', PlayerList[i][2])
  // }
}
