import { faker } from '@faker-js/faker'

export type Person = {
  id: number
  nickName: string
  max: number
  min: number
  mobile: string
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    id: faker.datatype.number(1000),
    nickName: faker.name.firstName(),
    max: faker.datatype.number(1000),
    min: faker.datatype.number(100),
    mobile: faker.datatype.string(9),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      }
    })
  }

  return makeDataLevel()
}
