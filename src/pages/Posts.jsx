import React, {useState, useEffect, useRef} from 'react';
import JsonPlaceholder from './../services/Jsonplaceholder';

function Posts() {
	const [posts, setPosts] = useState();
	const [indexChangePost, setIndexChangePost] = useState();

	const inputNewTitle = useRef();
	const textareaNewDescription = useRef();
	const clearNewForm = useRef();

	const inputChangeTitle = useRef();
	const textareaChangeDescription = useRef();
	const clearChangeForm = useRef();

	let resetNewForm = () => {
		clearNewForm.current.reset()
	}

	let resetChangeForm = () => {
		clearChangeForm.current.reset()
	}

	const getData = async path => setPosts(await JsonPlaceholder(path));

	const addPost = async(e) => {
		e.preventDefault();

		let newPostTitle = inputNewTitle.current.value;
		let newDescription = textareaNewDescription.current.value;

		let newPostAdd = await JsonPlaceholder(`posts`,`POST`, {title: newPostTitle, body: newDescription})

		setPosts(prevState=> prevState.concat([newPostAdd]))

		alert(`New post ${newPostTitle} added`)

		resetNewForm()
	}

	const changePost = async(e) => {
		e.preventDefault();

		if(indexChangePost){
			let changePostTitle = inputChangeTitle.current.value;
			let changeDescription = textareaChangeDescription.current.value; 
	
			let changePostAdd = await JsonPlaceholder(`posts/${indexChangePost}`,`PUT`, {title: changePostTitle, body: changeDescription});
			
			let changePost = posts.forEach((item)=>{
				if(item.id === indexChangePost){
					item.title = changePostTitle;
					item.body = changeDescription
				}
			})
	
			setPosts(prevState => prevState.concat([]));
		
		}
		
		resetChangeForm()
	}

	const btnDelete = async(e) => {
		let indexOfPost = posts.findIndex(post=>post.id === e.target.parentElement.id)

		let deletePost = await JsonPlaceholder(`posts/${indexOfPost}`,`DELETE`);
	
		posts.splice(indexOfPost,1)

		setPosts(prevState => prevState.concat([]));
	}

	const btnChange = async(e) => {
		let indexOfPost = parseInt(e.target.parentElement.id)
		setIndexChangePost(indexOfPost)
		let findPost = posts.find(item => item.id === indexOfPost)

		inputChangeTitle.current.focus()
		inputChangeTitle.current.value = findPost.title
		textareaChangeDescription.current.value = findPost.body

	}


	useEffect(()=>{
		 getData(`posts`);
	},[])

	
	return (
		<>
			<h3>Let's try to add, change or delete posts!</h3>
			<div className='wrapper'>
				<form onSubmit={addPost} ref={clearNewForm}>
					<input placeholder='Write new title' ref={inputNewTitle}></input>
					<textarea placeholder='Write new description' ref={textareaNewDescription}></textarea>
					<button>Add new post</button>
				</form>
				<form onSubmit={changePost} ref={clearChangeForm}>
					<input placeholder='Edit title' ref={inputChangeTitle}></input>
					<textarea placeholder='Edit description' ref={textareaChangeDescription}></textarea>
					<button>Change post</button>
				</form>
			</div>
			<ul>
				{posts? posts.map((item, index)=> 
					<li key={index} id={item.id}>
						<h4>#{item.id} Title: {item.title}</h4>
						<p>Description: {item.body}</p> 
						<button onClick={btnDelete}>Delete</button>
						<button onClick={btnChange}>Change</button>
					</li>) : undefined}
			</ul>
		</>
	);
}

export default Posts;