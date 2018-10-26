# Репозиторий с материалами доклада "LET'S KILL LIFECYCLE"

## Материалы 
[Слайды](https://drive.google.com/open?id=1m2Yhx2FGJze91drvaRqTWPmxMZxnqojm) с [OdessaJS 2018](http://odessajs.org/)

[Слайды](https://drive.google.com/file/d/1RyaBodMCwcoSTdwsULG5Jsng3eaWU-8h/view?usp=sharing) с [FrontTalks 2018](https://events.yandex.ru/events/fronttalks/2018/?talk=6358)

[Слайды](https://drive.google.com/open?id=1Ds9i9ENOZCmKGRYK2y7aYBtvGQBkaFoR) с [#ITsubbotnik: technological mix 2018 Moscow](https://events.epam.com/events/itsubbotnik-technological-mix/talks/7368)

[Video](https://youtu.be/5PM5c0EUMyE) с [OdessaJS 2018](http://odessajs.org/)

Video с [FrontTalks 2018](http://fronttalks.ru/) is coming soon...

## Что в репозитории
С помощью [Redux Form](https://redux-form.com) реализована простая формочка с 5-ю полями.
Дополнительные требования:
1. Email должен заполняться автоматически по имени. Но при условии, что пользователь 
сам его не вводил.
2. При переключении типа пользователя (сотрудник или нет) мы должны поменять тип телефона. 
Но введённый до этого телефон должен где запомниться, а поле очиститься.
При переключении обратно, мы должны восстановить ранее введенный телефон.
3. Должно проверяться по фамилии, не является ли клиент VIP. Обычно для этого ходят на сервер. 
Но для примера, просто происходит асинхронная проверка, что количество букв в фамилии 
делиться на 3.

Это сделано несколькими способами:
1. [React Lifecycle](https://reactjs.org/docs/react-component.html). Ветка **lifecycle**. Просто посмотрите, как там все плохо.
2. [Redux-Saga](https://github.com/redux-saga/redux-saga). Ветка **saga**.
3. [redux-observable](https://github.com/redux-observable/redux-observable). Ветка **redux-observable**.
4. [react-redux-rxjs](https://github.com/redneckz/react-redux-rxjs). Ветка **react-redux-rxjs**. Не очень популярная, но очень классная библиотека.

## Ссылки 
 - [Пост](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html) об изменении lifecycle в 
 React 17.
 - [Пост](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) об неправильном использовании **getDerivedStateFromProps**.
 - [Видео](https://www.youtube.com/watch?v=3J9EJrvqOiM) с Talk from React Amsterdam Conference 2017 и 
   [статья](https://hackernoon.com/how-to-decouple-state-and-ui-a-k-a-you-dont-need-componentwillmount-cc90b787aa37) 
    на Hackernoon от Michel Weststrate (создателя MobX), о разделении представления и логики.
 - [Redux Middleware](https://redux.js.org/advanced/middleware).
 - [RxJS 6](https://github.com/reactivex/rxjs).
 - [Развернутый ответ](https://stackoverflow.com/questions/40021344/why-use-redux-observable-over-redux-saga/40027778#40027778) на stackoverflow, в чем отличие redux-observable и redux-saga.
 - [HOC](https://reactjs.org/docs/higher-order-components.html) - паттерн Higher Order Component.
 - [Выступление](https://www.youtube.com/watch?v=HEqgw16l64Q) Тимофея Ткаченко "componentDidMount не нужен". 
 Еще один способ избавиться от lifecycle 
   
