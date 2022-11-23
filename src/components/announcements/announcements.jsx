import { convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';
import draftToHtml from "draftjs-to-html";
import DOMPurify from 'dompurify';

import "./announcements.css";

export const Announcements = (props) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [adding, setAdding] = useState(false);

    const [posts, setPosts] = useState([]);

    const savePost = async () => {
        // let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        let html = createMarkup(currentContentAsHTML);
        console.log(html);

        let newPosts = posts.splice(0);
        newPosts.push(html);
        setPosts(newPosts);
        setAdding(false);
        setEditorState(EditorState.createEmpty());
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div className="announcements-page">
            <h1 style={{ margin: "20px", marginBottom: "25px" }}>Announcements</h1>
            <div className="announcement-btns vert-flex">
                <Button variant='success' onClick={() => {
                    if (!adding)
                        setAdding(true);
                    else {
                        savePost();
                    }
                }}>{adding ? "Save" : "New Announcement"}</Button>
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
                <div className="hor-center border rounded announcements-editor">
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
                        return (
                            <div className="border hor-center rounded announcement" key={index} dangerouslySetInnerHTML={post}>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}