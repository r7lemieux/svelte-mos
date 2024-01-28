import { Rezult } from '../common/message/rezult';
import { ErrorName } from '../common/message/errorName';
export class DbService {
    getMo = async (moDef, id) => Promise.reject(new Rezult(ErrorName.missing_implementation));
    addMo = async (mo) => Promise.reject(new Rezult(ErrorName.missing_implementation));
    saveMo = async (mo) => Promise.reject(new Rezult(ErrorName.missing_implementation));
    updateMo = async (mo) => Promise.reject(new Rezult(ErrorName.missing_implementation));
    deleteMo = async (mo) => Promise.reject(new Rezult(ErrorName.missing_implementation));
    getMos = async (moDef) => Promise.reject(new Rezult(ErrorName.missing_implementation));
    saveMos = (mos) => Promise.reject(new Rezult(ErrorName.missing_implementation));
}
