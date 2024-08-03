import React from 'react';
import './TeamMembers.css';

const TeamMembers = () => {
  return (
    <div className="team-members-section">
      <section>
        <div className="container">
          {/* Card1 */}
          <div className="card">
            <div className="content">
              <div className="avatarImg adityaAvatar"></div>
              <div className="avatarTxt">
                <h3>Aditya Prasad</h3>
                <span>Reviewer</span>
              </div>
            </div>
            <ul className="socialIcons">
              <li style={{ '--i': 1 }}>
                <a href="#">
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': 2 }}>
                <a href="#">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': 3 }}>
                <a href="#">
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Card2 */}
          <div className="card">
            <div className="content">
              <div className="avatarImg akshayAvatar"></div>
              <div className="avatarTxt">
                <h3>Akshay RaHul</h3>
                <span>Scrum Master</span>
              </div>
            </div>
            <ul className="socialIcons">
              <li style={{ '--i': 2 }}>
                <a href="#">
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': 1 }}>
                <a href="#">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': 3 }}>
                <a href="#">
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Card3 */}
          <div className="card">
            <div className="content">
              <div className="avatarImg deepakAvatar"></div>
              <div className="avatarTxt">
                <h3>Deepak Barathi</h3>
                <span>Developer</span>
              </div>
            </div>
            <ul className="socialIcons">
              <li style={{ '--i': 3 }}>
                <a href="#">
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': 2 }}>
                <a href="#">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ '--i': 1 }}>
                <a href="#">
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamMembers;
