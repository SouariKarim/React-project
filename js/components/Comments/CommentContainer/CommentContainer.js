import classes from "./container.module.scss"
import {useEffect, useState} from "react";
import CommentsControls from "../CommentsControls/CommentsControls";
import CommentItem from "../CommentItem/CommentItem";
import {AnimatePresence, LayoutGroup} from "framer-motion";
import useComments from "../../../hooks/useComments";
import FreelanceComment from "../../../models/FreelanceComment"
import LoadingWidget from "../../Loading/LoadingWidget/LoadingWidget";
import moment from "moment";


export default function CommentsContainer({freelance, withControls = false}) {

    const {getComments} = useComments();
    const [isLoading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const nbComments = comments.length;


    useEffect(() => {
        setLoading(true);
        getComments(freelance.id).then((comments) => {
            setComments(comments.map((comment) => new FreelanceComment(comment)));
        }).catch((err) => {
        }).finally(() => {
            setLoading(false);
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const sortComments = (a, b) => {
        const dateA = moment(a.createdAt);
        const dateB = moment(b.createdAt);

        return dateA.isSameOrBefore(dateB) ? 1 : -1;
    }


    const addComment = (newComment) => {
        setComments((comments) => [...comments, newComment]);
    }


    const removeComment = (commentToDelete) => {
        setComments((comments) => comments.filter((comment) =>
            comment.id !== commentToDelete.id && comment.id !== commentToDelete.localId
        ));
    }


    return (
        <div className={classes.container}>
            <h3>Vos commentaires <span>({nbComments})</span> :</h3>

            {withControls &&
                <CommentsControls
                    freelance={freelance}
                    addComment={addComment}
                />
            }

            <div className={classes.comments}>
                <LoadingWidget active={isLoading}/>

                {nbComments === 0 ?
                    <p className={classes.noComments}>Aucun commentaires pour ce profil.</p>
                    :
                    <AnimatePresence>
                        <LayoutGroup>
                            {comments.sort(sortComments).map((comment) =>
                                <CommentItem
                                    key={"comment-" + comment.id}
                                    initialCommentData={comment}
                                    removeComment={removeComment}
                                />
                            )}
                        </LayoutGroup>
                    </AnimatePresence>
                }
            </div>
        </div>
    )
}