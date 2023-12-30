import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BlogTitle } from './Blog'
import { BlogInfo } from './Blog'
import Togglable from './Togglable'
import userEvent from '@testing-library/user-event'
import Create from './Create'

let container

beforeEach(() => {
  container = render(<Togglable buttonLabel="view"> 
    <div className='testDiv'>testDiv</div>
  </Togglable>).container
})

test('<BlogTitle renders the title and the author/> ', async () => {
  const newBlog = {
    author: 'nicholas',
    title: 'fantasy game',
    url: '39rhfewoifnwe',
    likes: 10994
  }

  const { container } = render(<BlogTitle blog={newBlog} />)
  const result = container.querySelector('.blogTitle')
  screen.debug()
  expect(result).toHaveTextContent('fantasy gamenicholas')
})

test('View button shows additional information of the blog', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.togglableContent') 
  expect(div).not.toHaveStyle('display: none')
})

test('Like handler is called twice when clicked twice', async () => {
  const user = userEvent.setup()
  const mockHandler = jest.fn()

  render(<button onClick={mockHandler}>like</button>)

  const button = screen.getByText('like')

  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Blog renders the right details', async () => {
  const user = userEvent.setup()
  const mockHandler = jest.fn()

  const { container } = render(<Create handleBlog={mockHandler} user={user}/>)
  
  const titleInput = container.querySelector('.title')
  const authorInput = container.querySelector('.author')
  const urlInput = container.querySelector('.url') 
  const button = screen.getByText('save')

  console.log(titleInput)

  await user.type(titleInput, 'test')
  await user.type(authorInput, 'nicholas')
  await user.type(urlInput, 'test')

  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe('test')
  expect(mockHandler.mock.calls[0][1]).toBe('nicholas')
  expect(mockHandler.mock.calls[0][2]).toBe('test')
})