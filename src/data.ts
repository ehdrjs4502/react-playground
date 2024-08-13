// data.ts

export interface SlideData {
  id: number;
  imageUrl: string;
  title: string;
}

export const slides: SlideData[] = [
  { id: 1, imageUrl: "https://via.placeholder.com/300x200", title: "Slide 1 Title" },
  { id: 2, imageUrl: "https://via.placeholder.com/300x200", title: "Slide 2 Title" },
  { id: 3, imageUrl: "https://via.placeholder.com/300x200", title: "Slide 3 Title" },
  { id: 4, imageUrl: "https://via.placeholder.com/300x200", title: "Slide 4 Title" },
  { id: 5, imageUrl: "https://via.placeholder.com/300x200", title: "Slide 5 Title" },
  { id: 6, imageUrl: "https://via.placeholder.com/300x200", title: "Slide 6 Title" },
];
