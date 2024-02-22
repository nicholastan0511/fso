import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks (
      author: $author,
      genre: $genre
    ) {
      title,
      published,
      author {
        name
      },
      genres,
      id
    }
  }
`

export const USER = gql`
  query {
    me {
      username,
      favoriteGenre,
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation add_book($title: String!, $author: String!, $published: Int!, $genres: [String]) 
  {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      },
      published,
      genres
    }
  }
`

export const SET_BIRTH = gql`
  mutation set_birth($name: String!, $setBornTo: Int!)
  {
    editAuthor (
      name: $name,
      setBornTo: $setBornTo
    ) {
      name,
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const REGISTER = gql`
  mutation register($username: String!, $favoriteGenre: String){
    createUser(username: $username, favoriteGenre: $favoriteGenre) {
      username,
      favoriteGenre,
      id
    }
  }
`