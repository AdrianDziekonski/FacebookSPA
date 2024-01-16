import { Photo } from "./photo"

export interface User {

 //informacje o użytkowniku
  id: number
  username: string
  gender: string
  age: number
  createdTime: string
  lastActive: string

   //zakładka info dodatkowe
  city: string
  country: string
  work: string
  car: string

  //zakładka o mnie
  motto: string
  description: string
  personality: string

  //Pasje, hobby
  hobby: string
  sport: string
  movies: string
  music: string

  //zdjęcia
  photos: Photo[]
  photoUrl: string
}
