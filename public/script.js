// Add Trainer
document.getElementById('addTrainerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const empId = document.getElementById('empId').value;
  const name = document.getElementById('trainerName').value;
  await fetch('/trainer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ empId, name })
  });
  alert('Trainer added');
});

// Get All Trainers
async function getAllTrainers() {
  const res = await fetch('/trainer');
  const data = await res.json();
  const list = document.getElementById('trainerList');
  list.innerHTML = '';
  data.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.empId} - ${t.name}`;
    list.appendChild(li);
  });
}

// Delete Trainer
document.getElementById('deleteTrainerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const empId = document.getElementById('deleteEmpId').value;
  await fetch('/trainer', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ empId })
  });
  alert('Trainer deleted');
});

// Get Trainer by ID
document.getElementById('getTrainerByIdForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const empId = document.getElementById('getEmpId').value;
  const res = await fetch(`/trainer/${empId}`);
  const data = await res.json();
  document.getElementById('trainerDetails').textContent = data.name ? `${data.empId} - ${data.name}` : 'Not found';
});

// Get Trainers by Subject
document.getElementById('getTrainersBySubjectForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const subject = document.getElementById('subjectName').value;
  const res = await fetch(`/trainer/${subject}/topic`);
  const data = await res.json();
  const list = document.getElementById('trainersBySubjectList');
  list.innerHTML = '';
  data.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.empId} - ${t.name}`;
    list.appendChild(li);
  });
});

// Add Subject
document.getElementById('addSubjectForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('subjectTitle').value;
  const description = document.getElementById('subjectDesc').value;
  await fetch('/subject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  });
  alert('Subject added');
});

// Get All Subjects
async function getAllSubjects() {
  const res = await fetch('/subject');
  const data = await res.json();
  const list = document.getElementById('subjectList');
  list.innerHTML = '';
  data.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.id} - ${s.name}`;
    list.appendChild(li);
  });
}

// Get Subject + Trainers
document.getElementById('getSubjectByIdForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('subjectId').value;
  const res = await fetch(`/subject/${id}`);
  const data = await res.json();
  document.getElementById('subjectDetails').textContent = data.name + ' - ' + data.description;
  const list = document.getElementById('subjectTrainerList');
  list.innerHTML = '';
  data.Trainers?.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.empId} - ${t.name}`;
    list.appendChild(li);
  });
});
