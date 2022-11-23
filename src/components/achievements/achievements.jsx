import { renderToString } from 'react-dom/server'
import { convertToRaw, EditorState, convertFromHTML, ContentState } from "draft-js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import DOMPurify from 'dompurify';

import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../App';


import "./achievements.css";
import { Pencil, Trash } from 'react-bootstrap-icons';
import { async } from '@firebase/util';

export const Achievements = (props) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [adding, setAdding] = useState(false);

    const [posts, setPosts] = useState([]);

    const [postToEdit, setPostToEdit] = useState(undefined);

    useEffect(() => {
        getAllPosts();
    }, []);

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const setEditing = (post, index) => {
        const blocks = convertFromHTML(
            post.__html
        );

        let newEditorState = EditorState.createWithContent(ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap));
        window.scrollTo(0, 0);
        setPostToEdit(index);
        setAdding(true);
        setEditorState(newEditorState);
    }

    //----   GET ALL POSTS   ----
    const getAllPosts = async () => {
        const allPosts = await getDocs(collection(db, "posts"));
        let postsToSet = [];
        allPosts.forEach(post => {
            let data = post.data();
            console.log(`${post.id}:  ${data.__html}`);
            if (data.__html !== undefined) {
                postsToSet.push({
                    id: post.id,
                    __html: data.__html
                });
            }
        });
        setPosts(postsToSet);
    }

    //----   SAVE POST   ----
    const savePost = async () => {
        let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        let html = createMarkup(currentContentAsHTML);

        try {
            // if editing overwrite doc
            if (postToEdit !== undefined) {
                const docRef = await setDoc(doc(db, "posts", posts[postToEdit].id), {
                    __html: html.__html
                });
            }
            // else add new
            else {
                const docRef = await addDoc(collection(db, "posts"), {
                    __html: html.__html
                });
            }
            alert("post saved!");
            setAdding(false);
            setPostToEdit(undefined);
            setEditorState(EditorState.createEmpty());
            getAllPosts();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("An error occurred");
        }
    }

    //----   DELETE POST   ----
    const deletePost = async (post) => {
        try {
            await deleteDoc(doc(db, "posts", post.id));
            getAllPosts();
            alert("Deleted");
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("An error occurred");
        }
    }

    return (
        <div className="achievements-page">
            <h1 style={{ margin: "20px", marginBottom: "25px" }}>achievements</h1>
            <div className="achievement-btns vert-flex">
                <Button variant='success' onClick={() => {
                    if (!adding)
                        setAdding(true);
                    else {
                        savePost();
                    }
                }}>{adding ? "Save" : "New achievement"}</Button>
                {
                    adding &&
                    <Button variant='light' onClick={() => {
                        setAdding(false);
                        setEditorState(EditorState.createEmpty());
                    }}>Cancel</Button>
                }
            </div>
            {
                adding &&
                <div className="hor-center border rounded achievements-editor">
                    <Editor
                        toolbarStyle={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1000
                        }}
                        editorState={editorState}
                        editorClassName="border"
                        onEditorStateChange={(state) => setEditorState(state)}
                    />
                </div>
            }

            <div>
                {
                    posts.map((post, index) => {
                        console.log(post);
                        return (
                            <div className="border hor-center rounded achievement" key={index} >
                                <div className='vert-flex achievement-header'>
                                    <Pencil onClick={() => setEditing(post, index)} className='hover' width={30} height={30} />
                                    <Trash style={{ marginLeft: "20px" }} onClick={() => deletePost(post)} className='hover' width={30} height={30} />
                                </div>
                                <div dangerouslySetInnerHTML={post}></div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}