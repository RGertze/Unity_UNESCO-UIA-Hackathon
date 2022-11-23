import { renderToString } from 'react-dom/server'
import { convertToRaw, EditorState, convertFromHTML, ContentState } from "draft-js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import DOMPurify from 'dompurify';
import { doc, setDoc } from "firebase/firestore"; 
import "./achievements.css";
import { Pencil } from 'react-bootstrap-icons';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../../App";


export const Achievements = (props) => {
    useEffect(() => {
        fetchDB();
    }, []);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [adding, setAdding] = useState(false);

    const [posts, setPosts] = useState([]);

    const [postToEdit, setPostToEdit] = useState(undefined);




    const pushToDB = async (html) => {
        try{
            let name = getAuth().currentUser.displayName;
            if(name==null) name = getAuth().currentUser.email;
            console.log(name);
            await addDoc(collection(db, "posts"), {
                text: html,
                date: new Date(),
                name:  name,
                uid: getAuth().currentUser.uid
            });
          
        console.log("Document written with ID: ");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    }

    const fetchDB = async () => {
        try{
            const querySnapshot = await getDocs(collection(db, "posts"));
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            
            posts.push(doc.data().text);
            console.log(doc.id, " => ", doc.data());
            });
        console.log("Document fetch with ID: ");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
 
    console.log(posts);
    setPosts(posts);
    setPostToEdit(undefined);
    setAdding(false);
    setEditorState(EditorState.createEmpty());
    }

    const savePost = async () => {
        let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        let html = createMarkup(currentContentAsHTML);

        let newPosts = posts.splice(0);

        if (postToEdit !== undefined) {
            newPosts[postToEdit] = html;
        } else {
            pushToDB(html);
            newPosts.push(html);
        }
        setPosts([...newPosts]);
        setPostToEdit(undefined);
        setAdding(false);
        setEditorState(EditorState.createEmpty());
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const setEditing = (post, index) => {


        const blocks = convertFromHTML(
            post.__html
        );

        console.log(blocks);

        let newEditorState = EditorState.createWithContent(ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap));
        window.scrollTo(0, 0);
        setPostToEdit(index);
        setAdding(true);
        setEditorState(newEditorState);
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