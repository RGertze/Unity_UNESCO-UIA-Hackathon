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

import Like from "../../assets/Group 192.png";
import Comment from "../../assets/Group 191.png";
import Reply from "../../assets/Group 193.png";

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
            <h1 style={{ marginBottom: "25px", marginTop: "20px", gridColumn: "1/3" }} className="hor-center">Achievements</h1>

            <div className='achievements-editor'>
                <div className="achievement-btns hor-center border rounded vert-flex">
                    <h3>New Achievement</h3>
                </div>

                <div className="hor-center border rounded achievements-editor">
                    <Editor
                        toolbarStyle={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1000
                        }}
                        editorStyle={{ minHeight: "200px", maxHeight: "400px", backgroundColor: "#e9e9e9" }}
                        editorState={editorState}
                        editorClassName="border"
                        onEditorStateChange={(state) => setEditorState(state)}
                    />
                </div>

                <h4 onClick={() => savePost()} style={{ justifyContent: "center", backgroundColor: "#8EC3CB", color: "black", width: "130px", height: "60px" }} className='hor-center border rounded vert-flex align-center hover'>
                    {postToEdit ? "Save" : "Publish"}
                </h4>
                {
                    adding &&
                    <h4 onClick={() => {
                        setAdding(false);
                        setEditorState(EditorState.createEmpty());
                        setPostToEdit(undefined);
                    }} style={{ justifyContent: "center", backgroundColor: "#eeeeee", color: "black", width: "130px", height: "60px" }} className='hor-center border rounded vert-flex align-center hover'>
                        Cancel
                    </h4>
                }
            </div>

            <div className='achievement-posts'>
                {
                    posts.map((post, index) => {
                        return (
                            <div className="hor-center achievement" key={index} >
                                <div className='vert-flex achievement-header'>
                                    <h3 className='p-1 rounded' style={{ color: "blue", backgroundColor: "white", marginRight: "30px" }}>Marina</h3>
                                    <Pencil onClick={() => setEditing(post, index)} className='hover' width={30} height={30} style={{ color: "blue" }} />
                                    <Trash style={{ marginLeft: "20px", color: "red" }} onClick={() => deletePost(post)} className='hover' width={30} height={30} />
                                </div>
                                <div dangerouslySetInnerHTML={post}></div>
                                <div className='achievement-social-btns vert-flex hor-center'>
                                    <img src={Like} className="hover" alt="" srcset="" />
                                    <img src={Reply} className="hover" alt="" srcset="" />
                                    <img src={Comment} className="hover" alt="" srcset="" />
                                </div>
                                <hr style={{ width: "80%" }} className="hor-center m-5" />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}