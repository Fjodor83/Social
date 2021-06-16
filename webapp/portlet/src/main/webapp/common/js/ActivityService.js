export function getSpaceActivities(spaceId, limit, expand) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/spaces/${spaceId}/activities?limit=${limit}&expand=${expand || ''}`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function getUserActivities(username, limit, expand) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/users/${username}/activities?limit=${limit}&expand=${expand || ''}`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function getActivityById(id, expand) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/activities/${id}?expand=${expand || ''}`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function deleteActivity(id) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/activities/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function likeActivity(id) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/activities/${id}/likes`, {
    method: 'POST',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    }
  });
}

export function unlikeActivity(id) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/activities/${id}/likes`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    }
  });
}