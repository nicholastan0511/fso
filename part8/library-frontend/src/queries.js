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
  query {
    allBooks {
      title,
      published,
      author,
      genres,
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
      author,
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