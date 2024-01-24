import {choicesToDb, dbToChoicesWithValidChoices, dbToPrimitiveMapWithDefaults, primitivesToDb} from './db.formater'
import { expect, test } from '@playwright/test';

test('tax model to db', () => {
  const dbTax = primitivesToDb(storeData1.tax)
  expect(dbTax).toEqual(dbData1.tax)
})
test('tax db to model', () => {
  const tax = dbToPrimitiveMapWithDefaults(dbData1.tax, taxDefaultValues)
  expect(tax).toEqual(storeData1.tax)
})
test('tax model to db to model', () => {
  const dbTax = primitivesToDb(storeData1.tax)
  const tax = dbToPrimitiveMapWithDefaults(dbTax, taxDefaultValues)
  expect(tax).toEqual(storeData1.tax)
})

test('profile model to db', () => {
  const dbTax = choicesToDb(storeData1.profile)
  expect(dbTax).toEqual(dbData1.profile)
})


const storeData1 = {
  date: 1638034498957,
  fp: '4f32ce7440810e81807ba9c439a79b1f',
  tax: {
    fileJointly: true,
    headOfHouse: false,
    income: 3455,
    married: false,
    taxPaid: 279747,
  },
  survey: [1, 2, 3, 5, 7, 9, 11, 62],
  profile: {
    Service: "I_served_in_Afghanistan",
    Military: "Military",
    Age: "over_55",
    Education: "Graduate_School",
    Origin: "Other",
  },
}
const dbData1 = {
  date: 1638034498957,
  fp: '4f32ce7440810e81807ba9c439a79b1f',
  tax: {
    f: true,
    h: false,
    i: 3455,
    m: false,
    t: 279747,
  },
  survey: [1, 2, 3, 5, 7, 9, 11, 62],
  profile: 'SIMMAoEGOO',
}
const taxDefaultValues = {
  fileJointly: false,
  headOfHouse: false,
  income: 0,
  married: false,
  taxPaid: 0,
}
