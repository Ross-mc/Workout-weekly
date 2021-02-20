"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("YTPlaylists", [
      {
        playlistId: "PLW0v0k7UCVrlhbFXDDKJ25fNOmG3OIMB1",
        category: "Yoga",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PLui6Eyny-UzwDdFPVSeYN3aTG_B1qtHtz",
        category: "Yoga",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PLP7Ou7uUiYzAw2ioFvclw-bS746YCuYPj",
        category: "Yoga",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PL4D0A206C6E5E8CAE",
        category: "Cardio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PL5lPziO_t_VihSUj6jvYDHpt4ZcPhV2bg",
        category: "Cardio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PL7Ax6CP9_hgPM5IQBajGHgd2zLmMPc-GV",
        category: "Cardio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PLRS2DE4P39EdCAYKkWqPfd9b6ZeNodzz2",
        category: "Strength",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PLLXmeIOBkPXSpKc2yIgaM4Iud_rf19nr3",
        category: "Strength",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PLx8N3RiJOYn12JNqpEEu9KqNKbdvghlJy",
        category: "Strength",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PLU9JyXjaxVhbqIm_1rsi1igqU8Oltxg_A",
        category: "Pilates",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PLipSZg1JNsC85jBimcGEIYUiYwrjEOm01",
        category: "Pilates",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PLIPPel3MuDjD-VKUzAQuABrx71VWMoNAf",
        category: "Pilates",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PL5lPziO_t_ViN5Mu1b17pTIGHfHgXf_Bi",
        category: "HIIT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "PL7zoYQ-ormEplqKBgcgEBDRmmwzDx_Ti1",
        category: "HIIT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playlistId: "RDQMds5H-KpCpR8",
        category: "HIIT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return null;
  }
};
