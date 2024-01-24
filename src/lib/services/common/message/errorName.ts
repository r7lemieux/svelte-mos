export enum ErrorName {
  ok,
  'compute_invalid_ratingSystem',
  'db_delete_no_id',
  'db_delete_fail',
  'db_error',
  'db_fail_create',
  'db_fail_delete',
  'db_fail_fetchRange',
  'db_fail_update',
  'db_invalid_digit',
  'db_invalid_key',
  'db_save_no_id',
  'db_add_id_to_auto_id',
  'db_notFound',
  'db_unexpected_multiple',
  'idGenerator_fail_setup_new_table',
  'field_invalid',
  'field_invalid_tooShort',
  'field_invalid_tooLong',
  'field_invalid_email',
  'field_invalid_key',
  'field_invalid_number',
  'field_invalid_numberTooLarge',
  'field_invalid_numberTooSmall',
  'field_unknown',
  'field_unsupported',
  'gdrive_missing_fileId',
  'gdrive_missing_id',
  'gdrive_file_notFound',
  'missing_field',
  'missing_implementation',
  'missing_param',
  'not_implemented_in_subclass',
  'req_invalid_action',
  'req_missing_id',
  'req_no_id',
  'server_error',
  'spreadsheet_no_name',
  'gdrive_error',
}

export const ErrorDef = {
  ok: {httpCode: 200},
  compute_invalid_ratingSystem: {httpCode: 500},
  db_error: {},
  db_fail_create: {},
  db_fail_delete: {},
  db_fail_fetchRange: {},
  db_fail_update: {},
  db_invalid_digit: {},
  db_invalid_key: {},
  db_notFound: {},
  db_unexpected_multiple: {},
  idGenerator_fail_setup_new_table: {},
  field_invalid: {httpCode: 400},
  field_invalid_email: {httpCode: 400},
  field_invalid_key: {httpCode: 400},
  field_invalid_number: {httpCode: 400},
  field_invalid_numberTooLarge: {httpCode: 400},
  field_invalid_numberTooSmall: {httpCode: 400},
  field_unknown: {httpCode: 400},
  field_unsupported: {httpCode: 400},
  not_implemented_in_subclass: {httpCode: 500},
  req_invalid_action: {httpCode: 400},
  req_missing_id: {httpCode: 400},
  req_no_id: {httpCode: 400},
  server_error: {httpCode: 500},
} 
