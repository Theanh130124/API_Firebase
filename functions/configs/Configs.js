var admin = require("firebase-admin");
//require là các module môi trường tự định nghĩa hoặc import qua npm vào node js
var serviceAccount = require("./serviceAccountKey.json");  //đúng với tên đặt

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL : `https://${serviceAccount.project_id}.firebaseio.com` //Kết nối csdl
});

//Tạo db để dùng
const db = admin.firestore();

exports.db = db ; 
exports.admin = admin ;  // để module khác có thể import