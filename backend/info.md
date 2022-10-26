npm install --save @nestjs/typeorm typeorm mysql2

docker compose build    (何かインストールした後はbuildする必要がありそう,その前にcompose down -v, build後にcompose up)
docker compose down -v    ボリュームを削除できる(この後compose upしてtypeormが見つからないエラーが治った, mysqlのECONNECTED ERRORもこれで解消した)