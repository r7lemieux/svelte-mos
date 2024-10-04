export var ErrorName;
(function (ErrorName) {
    ErrorName[ErrorName["ok"] = 0] = "ok";
    ErrorName[ErrorName["compute_invalid_ratingSystem"] = 1] = "compute_invalid_ratingSystem";
    ErrorName[ErrorName["db_delete_no_id"] = 2] = "db_delete_no_id";
    ErrorName[ErrorName["db_delete_fail"] = 3] = "db_delete_fail";
    ErrorName[ErrorName["db_error"] = 4] = "db_error";
    ErrorName[ErrorName["db_fail_create"] = 5] = "db_fail_create";
    ErrorName[ErrorName["db_fail_delete"] = 6] = "db_fail_delete";
    ErrorName[ErrorName["db_fail_fetchRange"] = 7] = "db_fail_fetchRange";
    ErrorName[ErrorName["db_fail_update"] = 8] = "db_fail_update";
    ErrorName[ErrorName["db_invalid_digit"] = 9] = "db_invalid_digit";
    ErrorName[ErrorName["db_invalid_key"] = 10] = "db_invalid_key";
    ErrorName[ErrorName["db_save_no_id"] = 11] = "db_save_no_id";
    ErrorName[ErrorName["db_add_id_to_auto_id"] = 12] = "db_add_id_to_auto_id";
    ErrorName[ErrorName["db_notFound"] = 13] = "db_notFound";
    ErrorName[ErrorName["db_unexpected_multiple"] = 14] = "db_unexpected_multiple";
    ErrorName[ErrorName["idGenerator_fail_setup_new_table"] = 15] = "idGenerator_fail_setup_new_table";
    ErrorName[ErrorName["field_invalid"] = 16] = "field_invalid";
    ErrorName[ErrorName["field_invalid_tooShort"] = 17] = "field_invalid_tooShort";
    ErrorName[ErrorName["field_invalid_tooLong"] = 18] = "field_invalid_tooLong";
    ErrorName[ErrorName["field_invalid_email"] = 19] = "field_invalid_email";
    ErrorName[ErrorName["field_invalid_key"] = 20] = "field_invalid_key";
    ErrorName[ErrorName["field_invalid_number"] = 21] = "field_invalid_number";
    ErrorName[ErrorName["field_invalid_numberTooLarge"] = 22] = "field_invalid_numberTooLarge";
    ErrorName[ErrorName["field_invalid_numberTooSmall"] = 23] = "field_invalid_numberTooSmall";
    ErrorName[ErrorName["field_unknown"] = 24] = "field_unknown";
    ErrorName[ErrorName["field_unsupported"] = 25] = "field_unsupported";
    ErrorName[ErrorName["gdrive_error"] = 26] = "gdrive_error";
    ErrorName[ErrorName["gdrive_missing_fileId"] = 27] = "gdrive_missing_fileId";
    ErrorName[ErrorName["gdrive_missing_id"] = 28] = "gdrive_missing_id";
    ErrorName[ErrorName["gdrive_file_notFound"] = 29] = "gdrive_file_notFound";
    ErrorName[ErrorName["missing_field"] = 30] = "missing_field";
    ErrorName[ErrorName["missing_implementation"] = 31] = "missing_implementation";
    ErrorName[ErrorName["missing_param"] = 32] = "missing_param";
    ErrorName[ErrorName["missing_value"] = 33] = "missing_value";
    ErrorName[ErrorName["not_implemented_in_default"] = 34] = "not_implemented_in_default";
    ErrorName[ErrorName["not_implemented_in_subclass"] = 35] = "not_implemented_in_subclass";
    ErrorName[ErrorName["req_invalid_action"] = 36] = "req_invalid_action";
    ErrorName[ErrorName["req_missing_id"] = 37] = "req_missing_id";
    ErrorName[ErrorName["req_no_id"] = 38] = "req_no_id";
    ErrorName[ErrorName["server_error"] = 39] = "server_error";
    ErrorName[ErrorName["spreadsheet_no_name"] = 40] = "spreadsheet_no_name";
    ErrorName[ErrorName["type5_error"] = 41] = "type5_error";
})(ErrorName || (ErrorName = {}));
export const ErrorDef = {
    ok: { httpCode: 200 },
    compute_invalid_ratingSystem: { httpCode: 500 },
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
    field_invalid: { httpCode: 400 },
    field_invalid_email: { httpCode: 400 },
    field_invalid_key: { httpCode: 400 },
    field_invalid_number: { httpCode: 400 },
    field_invalid_numberTooLarge: { httpCode: 400 },
    field_invalid_numberTooSmall: { httpCode: 400 },
    field_unknown: { httpCode: 400 },
    field_unsupported: { httpCode: 400 },
    not_implemented_in_subclass: { httpCode: 500 },
    req_invalid_action: { httpCode: 400 },
    req_missing_id: { httpCode: 400 },
    req_no_id: { httpCode: 400 },
    server_error: { httpCode: 500 },
    type5_error: { httpCode: 505 },
};
