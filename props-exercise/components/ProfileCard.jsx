import React from 'react';

const ProfileCard = ( { user }) => {
  const image = 'https://i.pravatar.cc/150?img=66';
  const { name,title } = user;
  return (
    <>
      <div className="profile-card">
        <img src={image} alt={name} className="profile-img" />
        <div className="profile-info">
          <h1 className="profile-name">{name}</h1>
          <h2 className="profile-title">{title}</h2>
          <button className="profile-button">Följ</button>
        </div>
      </div>
      <style>{`
        .profile-card {
          background: #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
          display: flex;
          gap: 1rem;
          align-items: center;
          max-width: 300px;
        }
        .profile-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .profile-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.1rem;
        }
        .profile-name {
          font-size: 1.25rem;
          font-weight: bold;
          color: #374151;
        }
        .profile-title {
          font-size: 1rem;
          color: #374151;
        }
        .profile-button {
          background: #374151;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  );
}

export default ProfileCard;