/**
 * KIM.TH Todo List Application
 * ระบบบันทึกสิ่งที่ต้องทำด้วย Local Storage
 */

class TodoApp {
  constructor() {
    this.todos = [];
    this.currentFilter = 'all';
    this.storageKey = 'kim_th_todos';
    this.editingId = null;

    this.initElements();
    this.loadTodos();
    this.attachEventListeners();
    this.render();
  }

  initElements() {
    // Input Elements
    this.todoInput = document.getElementById('todoInput');
    this.addBtn = document.getElementById('addBtn');

    // Filter Elements
    this.filterBtns = document.querySelectorAll('.filter-btn');

    // Display Elements
    this.todoList = document.getElementById('todoList');
    this.emptyState = document.getElementById('emptyState');
    this.totalTodos = document.getElementById('totalTodos');
    this.completedTodos = document.getElementById('completedTodos');
    this.activeTodos = document.getElementById('activeTodos');

    // Action Buttons
    this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
    this.clearAllBtn = document.getElementById('clearAllBtn');
    this.exportBtn = document.getElementById('exportBtn');

    // Modal Elements
    this.modal = document.getElementById('confirmModal');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalMessage = document.getElementById('modalMessage');
    this.confirmBtn = document.getElementById('confirmBtn');
    this.cancelBtn = document.getElementById('cancelBtn');
  }

  attachEventListeners() {
    // Input and Add Button
    this.addBtn.addEventListener('click', () => this.addTodo());
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });

    // Filter Buttons
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.render();
      });
    });

    // Action Buttons
    this.clearCompletedBtn.addEventListener('click', () => this.showConfirm('clearCompleted'));
    this.clearAllBtn.addEventListener('click', () => this.showConfirm('clearAll'));
    this.exportBtn.addEventListener('click', () => this.exportTodos());

    // Modal Buttons
    this.confirmBtn.addEventListener('click', () => this.handleConfirm());
    this.cancelBtn.addEventListener('click', () => this.hideModal());
  }

  /**
   * เพิ่ม Todo ใหม่
   */
  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) {
      alert('กรุณากรอกสิ่งที่ต้องทำ');
      this.todoInput.focus();
      return;
    }

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      important: false,
      createdAt: new Date().toLocaleString('th-TH')
    };

    this.todos.unshift(todo);
    this.saveTodos();
    this.todoInput.value = '';
    this.todoInput.focus();
    this.render();
  }

  /**
   * ทำเครื่องหมายว่าเสร็จแล้ว
   */
  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.render();
    }
  }

  /**
   * ทำเครื่องหมายว่าสำคัญ
   */
  toggleImportant(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.important = !todo.important;
      this.saveTodos();
      this.render();
    }
  }

  /**
   * ลบ Todo
   */
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
    this.render();
  }

  /**
   * แสดง Modal ยืนยัน
   */
  showConfirm(action) {
    this.confirmAction = action;
    const messages = {
      clearCompleted: {
        title: 'ลบรายการที่เสร็จแล้ว',
        message: 'คุณแน่ใจหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้'
      },
      clearAll: {
        title: 'ลบทั้งหมด',
        message: '⚠️ ลบรายการทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้'
      }
    };

    const msg = messages[action];
    this.modalTitle.textContent = msg.title;
    this.modalMessage.textContent = msg.message;
    this.modal.classList.add('show');
  }

  hideModal() {
    this.modal.classList.remove('show');
    this.confirmAction = null;
  }

  /**
   * จัดการการยืนยัน
   */
  handleConfirm() {
    if (this.confirmAction === 'clearCompleted') {
      this.todos = this.todos.filter(t => !t.completed);
    } else if (this.confirmAction === 'clearAll') {
      this.todos = [];
    }
    this.saveTodos();
    this.hideModal();
    this.render();
  }

  /**
   * ส่งออก Todos เป็น JSON
   */
  exportTodos() {
    const dataStr = JSON.stringify(this.todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kim-th-todos-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * บันทึก Todos ลง Local Storage
   */
  saveTodos() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  /**
   * โหลด Todos จาก Local Storage
   */
  loadTodos() {
    const stored = localStorage.getItem(this.storageKey);
    this.todos = stored ? JSON.parse(stored) : [];
  }

  /**
   * ตรวจสอบว่า Todo ตรงกับ filter
   */
  matchesFilter(todo) {
    switch (this.currentFilter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      case 'important':
        return todo.important;
      default:
        return true;
    }
  }

  /**
   * อัปเดตสถิติ
   */
  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const active = total - completed;

    this.totalTodos.textContent = total;
    this.completedTodos.textContent = completed;
    this.activeTodos.textContent = active;
  }

  /**
   * สร้าง HTML สำหรับ Todo Item
   */
  createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''} ${todo.important ? 'important' : ''}`;
    li.innerHTML = `
      <input
        type="checkbox"
        class="checkbox"
        ${todo.completed ? 'checked' : ''}
        data-id="${todo.id}"
      >
      <div class="todo-content">
        <div class="todo-text">${this.escapeHtml(todo.text)}</div>
        <div class="todo-date">📅 ${todo.createdAt}</div>
      </div>
      <div class="todo-actions">
        <button class="action-icon-btn star" data-id="${todo.id}" title="ทำเครื่องหมายสำคัญ">
          ${todo.important ? '⭐' : '☆'}
        </button>
        <button class="action-icon-btn delete" data-id="${todo.id}" title="ลบ">
          🗑️
        </button>
      </div>
    `;

    // Event Listeners
    const checkbox = li.querySelector('.checkbox');
    checkbox.addEventListener('change', () => this.toggleComplete(todo.id));

    const starBtn = li.querySelector('.star');
    starBtn.addEventListener('click', () => this.toggleImportant(todo.id));

    const deleteBtn = li.querySelector('.delete');
    deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

    return li;
  }

  /**
   * Escape HTML เพื่อป้องกัน XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Render ทั้งหมด
   */
  render() {
    // ตรวจสอบและกรองข้อมูล
    const filteredTodos = this.todos.filter(t => this.matchesFilter(t));

    // อัปเดตสถิติ
    this.updateStats();

    // ล้าง List
    this.todoList.innerHTML = '';

    // แสดง Empty State
    if (filteredTodos.length === 0) {
      this.emptyState.classList.add('show');
    } else {
      this.emptyState.classList.remove('show');
      filteredTodos.forEach(todo => {
        this.todoList.appendChild(this.createTodoElement(todo));
      });
    }
  }
}

// เริ่มต้นแอปพลิเคชัน
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
  });
} else {
  new TodoApp();
}