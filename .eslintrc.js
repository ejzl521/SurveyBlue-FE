module.exports = {
  // plugin:prettier/recommended
  // root 디렉토리의 .prettierrc 파일이 있는지를 찾고, 해당 파일의 rule을 이용
  "extends": ["react-app", "plugin:prettier/recommended"],
  "env": {
    "browser": true
  },
  "ignorePatterns": ["node_modules/"],
  "rules": {
    // console을 사용하면 경고하기
    "no-console": "warn"
  }
}