import { FirestoreDbService } from  '$lib/services/db/Firestore.db.service';
export const local = {
    signInSuccessUrl: 'http://127.0.0.1:5173',
    uiUrl: 'http://localhost:3000/',
};
export const online = true;
export const defaultDbService = new FirestoreDbService();
export const getDefaultDbService = () => defaultDbService || new FirestoreDbService();
export const emulator = {
    signInSuccessUrl: 'http://127.0.0.1:5173',
    // uiUrl: 'http://localhost:5173/',
    // authenticationUrl: 'https://localhost:9099/costofwar-78f15',
    // databaseUrl: 'http://localhost:8080/',
    // cowFunctionUrl: 'http://localhost:5001/costofwar-78f15/us-central1/cowSurvey',
    // contributeFunctionUrl: 'http://localhost:5001/costofwar-78f15/us-central1/contribute',
    // compileFunctionUrl: 'http://localhost:5001/costofwar-78f15/us-central1/compile',
    // statsFunctionUrl: 'http://localhost:5001/costofwar-78f15/us-central1/stats',
};
export const prod = {
    signInSuccessUrl: 'http://127.0.0.1:5173',
    // uiUrl: 'https://costofwar-78f15.web.app',
    // cowFunctionUrl: 'https://us-central1-costofwar-78f15.cloudfunctions.net/cowSurvey',
    // contributeFunctionUrl: 'http://us-central1-costofwar-78f15.cloudfunctions.net/contribute',
    // compileFunctionUrl: 'http://us-central1-costofwar-78f15.cloudfunctions.net/compile',
    // statsFunctionUrl: 'http://us-central1-costofwar-78f15.cloudfunctions.net/stats',
};
export const config = local;
/*
icons:
  https://leshak.github.io/svelte-icons-pack/#/pack/ai

google login
  https://www.rapidsslonline.com/blog/simple-guide-java-keytool-keystore-commands/
*/
//# sourceMappingURL=config.js.map