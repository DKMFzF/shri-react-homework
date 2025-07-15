# Межгалактическая аналитика

Проект сделан в рамках учебной программы Школы Разработки Интерфейсов Яндекса. Проект представляет собой сервис для генерации data-фалов с данными выдуманых межгалактических цивилизаций и сбора аналитики из этих файлов.

![screen](./docs/screen.png)

## Установка и запуск

Для установки и запуска проекта выполните следующие команды

```bash
npm install
npm run dev
```

или

```bash
yarn
yarn dev
```

## Документация

- [backend](./shri2025-analyzer-api/readme.md)
- [frontend](./shri2025-frontend/README.md)

### Тестирование приложения

Для начала тестирования введите

```bash
npm run test
```

#### Описание тестов

- Тестирование states (unit-test)

  - `generatorStore.test.ts` - тестирования state генерации
  - `fileStore.test.ts` - тестирование state файла
  - `analystStore.test.ts` - тестирование state аналитики

- Тестирование запросов к API (unit-test)
  - `baseApi.test.ts` - тестирование базовго api
  - `reportsApi.test.ts` - тестирование reportsApi
  - `aggregateApi.test.ts` - тестирование aggregateApi

- Drag&Drop (unit-test)
  - `useDragAndDrop.test.ts` - тестирование хука drag&drop
  - `AnalystDragAndDrop.test.tsx` - тестирование компонента отвечающего за Drag&Drop. **В тестирование входит загрука файла перетаскиванием и загрузка на кнопку.**

- localStorage и хэндлеры агрегации данных (unit-test)
  - `handleDataChunk.test.ts` - тестирование хэдлера разбиения на чанки
  - `handleSubmitAggregatedData.test.ts` - тестирование хэндлера отправки даных.
  - `handleSubmitWrapperAggregatedData.test.ts` - тестирование wrapper-а агрегации даных.

- Тестирование Навигации (e2e-test)
  - `navigation.spec.ts` - тестирование переключение страниц

- Тестирование Loading-status (e2e-test)
  - `loader.spec.ts` - тестирование отображение прогресса обработки

