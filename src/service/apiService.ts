import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});
/**
 * REST-API の GET メソッドを実行する
 *
 * @param {any} url REST-API のURL
 * @param {any} callback 呼び出し元のコールバック処理
 * @param {any} [option=null] axios のオプション
 */
export function get(url: string, callback: any, option: any = null) {

  // axios を使って引数で指定された url に対してリクエストを投げる
  instance.get(url, option)
    .then(function (response) {

      // 返ってきたレスポンスはそのまま加工せずに callback で呼び出し元へ渡す
      callback(response);
    })
    .catch(function (error) {
      console.log('ERROR!! occurred in Backend.')
    });
}