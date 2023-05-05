# Проект "Доставка продуктов"
Проект представляет из себя мобильное кроссплатформенное приложение, написанное на React Native.
# Шаги выполнения
**1. Настройка программного обеспечения.**

В данном проекте используется IDE - Visual Studio Code, Android Emulator - Android Studio. 
Используется CLI - Expo дабы устранить излишнюю конфигурацию под ios и android.

**2. Разработка прототипа приложения**

Макеты создавались в figma. Макеты представлены в двух вариантах в зависимости от локализации - ru и en. 

Ссылка на макеты: 

https://www.figma.com/file/M2iI68fEt4xoHj7w5j4zhL/Delivery-products-UI-Design?node-id=0-1&t=iaVGjTfiOG6Dp3Sz-0 

**3. Разработка пользовательского интерфейса**

Интерфейс приложения разрабатывался на основе макетов с использольванием styled components. 
Пример стилизации компоненты:

![image](https://user-images.githubusercontent.com/44906806/235351965-a777b14e-402a-4822-ae57-33dd0269e688.png)

**4. Поддержка портретного вида для скрина с конкретным продуктом**

Книжная версия:

![image](https://user-images.githubusercontent.com/44906806/235352693-7cfb6502-f328-439b-b4f3-ba45d5545267.png)

Портретная версия:

![ezgif com-video-to-gif (3)](https://user-images.githubusercontent.com/44906806/235352755-77867e1f-ecca-4e02-9e61-6c52c27ea8ca.gif)

**5. Написание бизнес-логики** 

За бизнес логику отвечают хуки функциональных компонент наподобие useState и useEffect.
Запросы к API сделаны с использованием react-query.

**6. Локализация приложения**

Локализация сделана с использованием библиотек expo-localization и i18n-js. 

![ezgif com-video-to-gif (1)](https://user-images.githubusercontent.com/44906806/235351818-3958ce2f-e36a-4e9c-b3fa-634d66ac5f70.gif)

**7. Адаптация приложения для работы с геолакацией**

Для работа с геолакацией была использована библиотека expo-location.

![ezgif com-video-to-gif (2)](https://user-images.githubusercontent.com/44906806/235352237-0fef582a-6514-4d9b-b345-e3e735802027.gif)

**8. Создание backend части**

API написан на NodeJS с использованием SQLite в качестве базы данных.
Были реализованы следующие endpoints:
1) /all - получение всех продуктов
2) /register - регистрация пользователя 
3) /login - авторизация пользователя 
4) /createOrder - создание заказа 
5) /getOrders/:id - получение заказов конкретного пользователя

**9. Обращение к API в React Native**

Для обращения к API была использована функция createApi из redux toolkit. В зависимости от метода (POST или GET), использовался builder.mutation или builder.query с последущим применением хуков в компонентах.

**10. Создание unit-тестов**

Unit-тесты написаны с использование Jest и react-testing-library. 
Тесты:
1) Корректный рендеринг компонента - Start.test.js
2) Инициализация модели данных и ее изменение - Redux.test.js
3) Взаимодействие с интерфейсом - Products.test.js

Результаты: 

![image](https://user-images.githubusercontent.com/44906806/236419630-ac6774a5-e9e4-4023-8c1f-b28c4b0ca278.png)
