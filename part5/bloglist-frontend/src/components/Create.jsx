const Create = (props) => {
    return  (
        <form onSubmit={props.handleBlog}>
            <div>
                title:
                <input type="text" value={props.title} onChange={({ target }) => {
                props.setTitle(target.value)
                }}/>
            </div>
            <div>
                author:
                <input type="text" value={props.author} onChange={({ target }) => {
                props.setAuthor(target.value)
                }}/>
            </div>
            <div>
                url:
                <input type="text" value={props.url} onChange={({ target }) => {
                props.setUrl(target.value)
                }}/>
            </div>
            <button type="submit">save</button>
        </form> 
    )
}

export default Create
