# iamport-angular-example

앵귤러 환겨에서 아임포트 결제 및 휴대폰 본인인증 연동을 위한 예제입니다.

## 다운받기

```
$ git clone https://github.com/iamport/iamport-angular-example
```

## 실행하기

```
$ cd ./iamport-angular-example
$ npm install
$ npm start
```

## 아임포트 라이브러리 추가하기

최상단 HTML(public/index.html)에 아래의 `<script>`를 삽입합니다. 아임포트 라이브러리는 jQuery 기반으로 동작하기 때문에 **jQuery 1.0 이상이 반드시 설치**되어 있어야합니다.

```html
  <!-- jQuery -->
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
  <!-- iamport.payment.js -->
  <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"></script>
```

## 결제 연동하기

결제 연동 방법은 [앵귤러에서 아임포트 결제 연동하기](manuals/PAYMENT.md) 문서를 참고하세요.

## 휴대폰 본인인증 연동하기

휴대폰 본인인증 연동 방법은 [앵귤러에서 아임포트 휴대폰 본인인증 연동하기](manuals/CERTIFICATION.md) 문서를 참고하세요.
