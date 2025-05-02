"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * @description Todo 항목 타입 정의
 */
export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * @description 로컬 스토리지에서 불러온 Todo 항목 형태
 */
interface StoredTodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // 로컬 스토리지에서는 날짜가 문자열로 저장됨
}

/**
 * @description Todo 앱 컴포넌트 - 토스 스타일 및 애니메이션 적용
 */
export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [mounted, setMounted] = useState(false);

  // 컴포넌트 마운트 시 로컬 스토리지 로드 및 상태 설정
  useEffect(() => {
    setMounted(true);
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map(
          (todo: StoredTodoItem) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
          })
        );
        setTodos(parsedTodos);
      } catch (e) {
        console.error("Todo 목록 불러오기 실패:", e);
        localStorage.removeItem("todos"); // 파싱 실패 시 데이터 제거
      }
    }
  }, []);

  // Todo 항목 변경 시 로컬 스토리지에 저장 (마운트 된 후에만 실행)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, mounted]);

  // 새 Todo 항목 추가
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: TodoItem = {
      id: crypto.randomUUID(), // 더 안전한 ID 생성
      text: inputValue,
      completed: false,
      createdAt: new Date(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue("");
  };

  // Todo 항목 삭제
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Todo 항목 완료 상태 토글
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 필터링된 Todo 목록
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // 필터 버튼 스타일 계산 함수
  const getFilterButtonStyle = (buttonFilter: typeof filter) => {
    const baseStyle = "btn btn-secondary text-sm py-1 px-3 rounded-full"; // 버튼 기본 스타일 및 크기 조정
    const activeStyle =
      "bg-primary-light text-primary dark:bg-blue-900/50 dark:text-primary font-semibold"; // 활성 상태 스타일
    return `${baseStyle} ${filter === buttonFilter ? activeStyle : "hover:bg-gray-50 dark:hover:bg-gray-700"}`;
  };

  return (
    <div className="card max-w-lg mx-auto p-6 md:p-8">
      {" "}
      {/* 카드 크기 및 패딩 조정 */}
      <h2 className="text-2xl font-bold mb-6 text-center text-text-primary">
        할 일 목록
      </h2>
      <div className="flex mb-6">
        <input
          type="text"
          className="input flex-grow mr-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && addTodo()}
          placeholder="새로운 할 일을 입력하세요..."
        />
        <button onClick={addTodo} className="btn btn-primary flex-shrink-0">
          {" "}
          {/* 버튼 기본 클래스 적용 */}
          추가
        </button>
      </div>
      <div className="flex justify-center mb-6 space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={getFilterButtonStyle("all")}
        >
          전체
        </button>
        <button
          onClick={() => setFilter("active")}
          className={getFilterButtonStyle("active")}
        >
          진행 중
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={getFilterButtonStyle("completed")}
        >
          완료
        </button>
      </div>
      <AnimatePresence mode="popLayout">
        {" "}
        {/* 항목 추가/삭제 애니메이션 */}
        <ul className="space-y-3">
          {" "}
          {/* 간격 조정 */}
          {filteredTodos.length === 0 ? (
            <motion.li
              className="text-center py-6 text-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              할 일이 없습니다. 새 항목을 추가해보세요!
            </motion.li>
          ) : (
            filteredTodos.map((todo, index) => (
              <motion.li
                key={todo.id}
                layout // 레이아웃 애니메이션 활성화
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }} // 퇴장 애니메이션
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.03, // 순차적 등장 애니메이션
                }}
                className={`flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 ${
                  todo.completed
                    ? "bg-gray-50 dark:bg-gray-800/50"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-4 w-5 h-5 accent-primary flex-shrink-0 cursor-pointer"
                />
                <span
                  className={`flex-grow text-base mr-3 break-words ${
                    // 폰트 크기 조정 및 줄바꿈
                    todo.completed
                      ? "line-through text-text-tertiary"
                      : "text-text-primary"
                  }`}
                >
                  {todo.text}
                </span>
                <motion.button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors flex-shrink-0 ml-auto p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
                  aria-label="삭제"
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12" // X 아이콘으로 변경
                    />
                  </svg>
                </motion.button>
              </motion.li>
            ))
          )}
        </ul>
      </AnimatePresence>
      {todos.length > 0 && (
        <motion.div
          className="mt-6 text-sm text-text-secondary text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          총 {todos.length}개 항목 중 {todos.filter((t) => t.completed).length}
          개 완료됨
        </motion.div>
      )}
    </div>
  );
}
