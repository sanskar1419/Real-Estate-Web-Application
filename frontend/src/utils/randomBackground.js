const backgroundCollection = [
  "./assets/images/background.jpg",
  "./assets/images/background2.jpg",
  "./assets/images/background3.jpg",
  "./assets/images/background4.jpg",
  "./assets/images/background5.jpg",
  "./assets/images/background6.jpg",
  "./assets/images/background7.jpg",
  "./assets/images/background8.jpg",
  "./assets/images/background9.jpg",
  "./assets/images/background10.jpg",
];

export const randomBackgroundPicker = () => {
  return backgroundCollection[
    Math.round(Math.random() * (backgroundCollection.length - 1 - 0) + 0)
  ];
};
