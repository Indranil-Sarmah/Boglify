import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-primary font-weight-bold">
                            {followers.length} Followers
                        </h5>
                        <hr />
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div className="mt-1 mb-1 pb-1">
                                    <Link to={`/user/${person._id}`} style={{ textDecoration: 'none' }}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <h5 className="lead">
                                                {person.name}
                                            </h5>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <h5 className="text-primary font-weight-bold mb-2">
                            {following.length} Following
                        </h5>
                        <hr />
                        {following.map((person, i) => (
                            <div key={i}>
                                <div className="mt-1 mb-1 pb-1">
                                    <Link to={`/user/${person._id}`} style={{ textDecoration: 'none'}}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <h5 className="lead">
                                                {person.name}
                                            </h5>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <h5 className="text-primary font-weight-bold">{posts.length} Posts</h5>
                        <hr />
                        {posts.map((post, i) => (
                            <div key={i}>
                                <div className="mt-1 mb-1 pb-1">
                                    <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                                        <div>
                                            <h5 className="lead">{post.title}</h5>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTabs;
