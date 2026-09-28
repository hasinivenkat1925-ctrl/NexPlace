import { 
  User, 
  BTechSubject, 
  CompanyProfile, 
  InterviewRoleGuidance, 
  HRQuestionGuide, 
  QuizAttempt, 
  ActivityLog, 
  Announcement,
  ResumeData
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'student-1',
    name: 'Arjun Verma',
    email: 'arjun@example.com',
    role: 'student',
    college: 'Delhi Technological University (DTU)',
    branch: 'Computer Science and Engineering',
    graduationYear: 2025,
    rollNumber: '21/CSE/042',
    phone: '+91 98765 43210',
    createdAt: '2026-08-15T10:00:00.000Z',
    lastLoginAt: '2026-09-28T07:45:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'student-2',
    name: 'Neha Patel',
    email: 'neha@example.com',
    role: 'student',
    college: 'Vellore Institute of Technology (VIT)',
    branch: 'Information Technology',
    graduationYear: 2025,
    rollNumber: '21BIT0189',
    phone: '+91 91234 56789',
    createdAt: '2026-08-20T14:30:00.000Z',
    lastLoginAt: '2026-09-27T18:20:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'student-3',
    name: 'Rohan Deshmukh',
    email: 'rohan@example.com',
    role: 'student',
    college: 'Pune Institute of Computer Technology (PICT)',
    branch: 'Electronics and Telecommunication',
    graduationYear: 2026,
    rollNumber: '22ETC078',
    phone: '+91 94567 89012',
    createdAt: '2026-09-01T09:15:00.000Z',
    lastLoginAt: '2026-09-26T16:10:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'admin-1',
    name: 'Dr. S. K. Raman',
    email: 'admin@placement.edu',
    role: 'admin',
    department: 'Head, Training & Placement Cell',
    phone: '+91 98111 22334',
    createdAt: '2026-06-01T08:00:00.000Z',
    lastLoginAt: '2026-09-28T08:15:00.000Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  }
];

export const INITIAL_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'attempt-101',
    userId: 'student-1',
    userName: 'Arjun Verma',
    userEmail: 'arjun@example.com',
    quizId: 'quiz-dsa-trees',
    quizTitle: 'Binary Trees & Traversals Mastery Quiz',
    category: 'topic',
    relatedSubjectOrCompany: 'Data Structures & Algorithms',
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    passed: true,
    attemptedAt: '2026-09-27T14:22:00.000Z',
    timeSpentSeconds: 340,
    userAnswers: { 1: 1, 2: 2, 3: 0, 4: 3, 5: 1 }
  },
  {
    id: 'attempt-102',
    userId: 'student-1',
    userName: 'Arjun Verma',
    userEmail: 'arjun@example.com',
    quizId: 'quiz-os-deadlocks',
    quizTitle: 'OS Concurrency & Deadlocks Quiz',
    category: 'topic',
    relatedSubjectOrCompany: 'Operating Systems',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    passed: true,
    attemptedAt: '2026-09-26T11:15:00.000Z',
    timeSpentSeconds: 410,
    userAnswers: { 1: 0, 2: 1, 3: 2, 4: 0, 5: 1 }
  },
  {
    id: 'attempt-103',
    userId: 'student-1',
    userName: 'Arjun Verma',
    userEmail: 'arjun@example.com',
    quizId: 'quiz-amazon-oa',
    quizTitle: 'Amazon SDE-1 OA Online Assessment Mock',
    category: 'company',
    relatedSubjectOrCompany: 'Amazon',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    passed: true,
    attemptedAt: '2026-09-25T16:40:00.000Z',
    timeSpentSeconds: 520,
    userAnswers: { 1: 2, 2: 1, 3: 0, 4: 1, 5: 3 }
  },
  {
    id: 'attempt-104',
    userId: 'student-2',
    userName: 'Neha Patel',
    userEmail: 'neha@example.com',
    quizId: 'quiz-dbms-normalization',
    quizTitle: 'DBMS Normalization & Relational Schema',
    category: 'topic',
    relatedSubjectOrCompany: 'Database Management Systems',
    score: 3,
    totalQuestions: 5,
    percentage: 60,
    passed: true,
    attemptedAt: '2026-09-27T17:05:00.000Z',
    timeSpentSeconds: 380,
    userAnswers: { 1: 2, 2: 0, 3: 1, 4: 2, 5: 0 }
  },
  {
    id: 'attempt-105',
    userId: 'student-3',
    userName: 'Rohan Deshmukh',
    userEmail: 'rohan@example.com',
    quizId: 'quiz-tcs-nqt',
    quizTitle: 'TCS NQT National Qualifier Test Mock',
    category: 'company',
    relatedSubjectOrCompany: 'Tata Consultancy Services (TCS)',
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    passed: true,
    attemptedAt: '2026-09-26T15:30:00.000Z',
    timeSpentSeconds: 430,
    userAnswers: { 1: 1, 2: 3, 3: 0, 4: 2, 5: 1 }
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    userId: 'student-1',
    userName: 'Arjun Verma',
    userRole: 'student',
    actionType: 'LOGIN',
    details: 'Logged in successfully from Delhi campus network.',
    timestamp: '2026-09-28T07:45:00.000Z'
  },
  {
    id: 'log-2',
    userId: 'student-1',
    userName: 'Arjun Verma',
    userRole: 'student',
    actionType: 'QUIZ_ATTEMPT',
    details: 'Completed "Binary Trees & Traversals Mastery Quiz" with score 100% (5/5).',
    timestamp: '2026-09-27T14:22:00.000Z'
  },
  {
    id: 'log-3',
    userId: 'student-2',
    userName: 'Neha Patel',
    userRole: 'student',
    actionType: 'TOPIC_STUDIED',
    details: 'Reviewed Operating Systems: Process Synchronization & Deadlocks notes.',
    timestamp: '2026-09-27T17:30:00.000Z'
  },
  {
    id: 'log-4',
    userId: 'student-1',
    userName: 'Arjun Verma',
    userRole: 'student',
    actionType: 'COMPANY_EXPLORED',
    details: 'Prepared for Amazon SDE-1 position and solved 3 previous year questions.',
    timestamp: '2026-09-25T16:45:00.000Z'
  },
  {
    id: 'log-5',
    userId: 'student-2',
    userName: 'Neha Patel',
    userRole: 'student',
    actionType: 'RESUME_UPDATED',
    details: 'Updated ATS Resume with 2 new projects and exported to PDF format.',
    timestamp: '2026-09-24T19:10:00.000Z'
  },
  {
    id: 'log-6',
    userId: 'admin-1',
    userName: 'Dr. S. K. Raman',
    userRole: 'admin',
    actionType: 'LOGIN',
    details: 'Administrator logged in to inspect placement readiness analytics.',
    timestamp: '2026-09-28T08:15:00.000Z'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Google & Microsoft Campus Hiring Drive Announced for 2025/2026 Batch',
    author: 'Placement Cell',
    date: 'Sep 25, 2026',
    category: 'Placement Drive',
    content: 'Registration window is now active. Eligibility: CGPA 7.5+ across all branches. Online coding assessment begins next Saturday. Please prepare DSA and System Design thoroughly.',
    actionLink: '#company-prep'
  },
  {
    id: 'ann-2',
    title: 'Resume Review & ATS Verification Mandatory Checklist',
    author: 'Career Development Centre',
    date: 'Sep 22, 2026',
    category: 'Assessment Alert',
    content: 'All shortlisted candidates must have ATS Score > 80% on their technical resumes before the on-campus interview rounds. Use the built-in NexPlace Resume Builder for compliance.',
    actionLink: '#resume-builder'
  },
  {
    id: 'ann-3',
    title: 'TCS National Qualifier Test (NQT) Prime & Digital Dates Out',
    author: 'Head of T&P Cell',
    date: 'Sep 18, 2026',
    category: 'Interview Schedule',
    content: 'Mock tests have been uploaded in the Company Preparation section. Students are advised to complete at least 2 full-length simulated tests before appearing.',
    actionLink: '#company-prep'
  }
];

export const BTECH_SUBJECTS: BTechSubject[] = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    code: 'CS-301',
    icon: 'Binary',
    description: 'Foundational problem solving covering linear and non-linear data structures, algorithm complexity, recursion, dynamic programming, and graphs.',
    semesterHint: '3rd & 4th Semester',
    recommendedDuration: '6 - 8 Weeks',
    topics: [
      {
        id: 'dsa-arrays-strings',
        subjectId: 'dsa',
        title: 'Arrays, Two-Pointers & Sliding Window',
        summary: 'Core techniques for solving array and string problems in O(N) time using two-pointer patterns, prefix sums, and sliding window heuristics.',
        importance: 'Very High',
        frequencyInInterviews: '95% of SDE Online Assessments',
        readTimeMinutes: 12,
        keyConcepts: [
          'Two Pointer Technique (Opposite ends vs Fast & Slow)',
          'Sliding Window (Fixed vs Variable window sizes)',
          'Prefix Sum & Difference Arrays for range queries',
          'Kadane’s Algorithm for Maximum Subarray Sum in O(N)',
          'Dutch National Flag Algorithm for 3-way partitioning'
        ],
        notesMarkdown: `### 1. Two-Pointer Approach
When an array is sorted or monotonic, two pointers moving from opposite ends reduce an $O(N^2)$ brute force to $O(N)$.
- **Opposite ends**: Two Sum II, Trapping Rain Water, Container With Most Water.
- **Fast & Slow**: Cycle detection in arrays (Floyd's algorithm), removing duplicates in-place.

### 2. Sliding Window Paradigm
- **Fixed Size (k)**: Maintain a running sum or hash frequency. When index reaches $i \ge k$, subtract element at $i-k$ and add element at $i$.
- **Variable Window**: Expand \`right\` pointer until condition is violated, then shrink \`left\` pointer until valid again. Example: Longest Substring Without Repeating Characters.

### 3. Kadane's Algorithm (Max Subarray)
\`\`\`cpp
int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0], currMax = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currMax = max(nums[i], currMax + nums[i]);
        maxSoFar = max(maxSoFar, currMax);
    }
    return maxSoFar;
}
\`\`\`
**Complexity:** Time: $O(N)$, Space: $O(1)$.`,
        cheatSheetPoints: [
          'Always check array boundaries ($i < n$) before dereferencing.',
          'If question asks for contiguous subarray with target sum/property -> Think Prefix Sum with HashMap or Sliding Window (if all positives).',
          'If array is sorted -> Think Binary Search or Two Pointers.',
          'Space optimization: In-place manipulation using sign bit or modulo arithmetic.'
        ],
        youtubeVideos: [
          {
            title: 'Sliding Window & Two Pointer Complete Masterclass',
            channel: "take U forward (Striver)",
            views: '1.4M views',
            duration: '1h 45m',
            youtubeId: '9kdHxplyl5I',
            url: 'https://www.youtube.com/watch?v=9kdHxplyl5I',
            topicHighlight: 'Comprehensive coverage of fixed and dynamic window problems with interview proofs.'
          },
          {
            title: 'Kadane’s Algorithm Explained with Proof & Code',
            channel: 'NeetCode',
            views: '890K views',
            duration: '14m 20s',
            youtubeId: '5WZl3MMT0Eg',
            url: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg',
            topicHighlight: 'Visualizing dynamic programming state reduction to O(1) space.'
          }
        ],
        quiz: {
          id: 'quiz-dsa-arrays',
          title: 'Arrays & Two-Pointers Coding Assessment',
          category: 'topic',
          relatedSubjectOrCompany: 'Data Structures & Algorithms',
          durationMinutes: 10,
          difficulty: 'Intermediate',
          questions: [
            {
              id: 1,
              question: 'What is the time complexity of Kadane’s algorithm to find the maximum contiguous subarray sum in an array of size N?',
              options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(1)'],
              correctAnswer: 1,
              explanation: 'Kadane’s algorithm iterates through the array once while maintaining current and global maximums in O(N) time and O(1) auxiliary space.'
            },
            {
              id: 2,
              question: 'Which technique is ideal for finding the longest substring without repeating characters?',
              options: ['Binary Search over elements', 'Breadth First Search', 'Sliding Window with a Hash Set/Map', 'Prefix Sum with Stack'],
              correctAnswer: 2,
              explanation: 'A variable-size sliding window with a HashSet or frequency map tracks duplicate characters and adjusts the left boundary in O(N) time.'
            },
            {
              id: 3,
              question: 'In the Dutch National Flag algorithm for sorting an array of 0s, 1s, and 2s, how many pointers are maintained?',
              options: ['1 pointer', '2 pointers', '3 pointers (low, mid, high)', '4 pointers'],
              correctAnswer: 2,
              explanation: 'It uses 3 pointers: low (boundary for 0s), mid (current element scanning), and high (boundary for 2s).'
            },
            {
              id: 4,
              question: 'Given an array of positive integers, what is the space complexity of finding if a subarray with sum K exists using Sliding Window?',
              options: ['O(1)', 'O(N)', 'O(log N)', 'O(K)'],
              correctAnswer: 0,
              explanation: 'Because all numbers are positive, expanding the right pointer increases the sum and advancing the left pointer decreases the sum, needing only O(1) auxiliary space.'
            },
            {
              id: 5,
              question: 'What happens if all numbers in the input array to Kadane’s algorithm are negative?',
              options: ['The sum is always 0', 'The algorithm enters infinite loop', 'The answer is the least negative (maximum) single element', 'It throws an integer overflow'],
              correctAnswer: 2,
              explanation: 'When all numbers are negative, the maximum contiguous subarray consists of the single largest (least negative) element.'
            }
          ]
        }
      },
      {
        id: 'dsa-trees-bst',
        subjectId: 'dsa',
        title: 'Binary Trees, BST & Tree Traversals',
        summary: 'In-order, Pre-order, Post-order, Level-order traversals, lowest common ancestor (LCA), binary search tree properties, and tree balancing.',
        importance: 'Very High',
        frequencyInInterviews: 'Asked in almost 90% of Tech Interviews',
        readTimeMinutes: 15,
        keyConcepts: [
          'Depth-First Search (Pre-order, In-order, Post-order) recursively and iteratively with Stack',
          'Breadth-First Search (Level Order Traversal) using Queue',
          'Binary Search Tree (BST) property: In-order traversal gives strictly sorted order',
          'Lowest Common Ancestor (LCA) in Binary Tree vs BST',
          'Tree Diameter and Maximum Path Sum in O(N)'
        ],
        notesMarkdown: `### 1. In-Order Traversal & BST Property
For a valid Binary Search Tree (BST):
$$\\text{Left Subtree} < \\text{Root} < \\text{Right Subtree}$$
An **In-order traversal** (Left $\\to$ Root $\\to$ Right) of a BST outputs elements in monotonically increasing order.

### 2. Lowest Common Ancestor (LCA) in a Binary Tree
\`\`\`cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}
\`\`\`
**Complexity:** Time: $O(N)$, Space: $O(H)$ recursion stack height.`,
        cheatSheetPoints: [
          'Height of balanced binary tree = $\\log_2 N$. Skewed tree height = $N$.',
          'Morris Traversal achieves $O(1)$ space in-order traversal using threaded binary trees.',
          'Maximum number of nodes on level $i$ (root at level 0) is $2^i$.',
          'A complete binary tree with $N$ nodes has height $\\lfloor \\log_2 N \\rfloor$.'
        ],
        youtubeVideos: [
          {
            title: 'Binary Trees Complete Playlist & Visual Intuition',
            channel: 'take U forward',
            views: '2.1M views',
            duration: '2h 10m',
            youtubeId: '_ANrF3FJm7I',
            url: 'https://www.youtube.com/watch?v=_ANrF3FJm7I',
            topicHighlight: 'Detailed step-by-step visualizations of all traversals and LCA problem patterns.'
          },
          {
            title: 'Tree Data Structure & Algorithms in 30 Minutes',
            channel: 'Abdul Bari',
            views: '3.4M views',
            duration: '42m',
            youtubeId: 'qH6yxkw0u78',
            url: 'https://www.youtube.com/watch?v=qH6yxkw0u78',
            topicHighlight: 'Theoretical clarity on AVL trees, rotation mechanics, and tree height formulas.'
          }
        ],
        quiz: {
          id: 'quiz-dsa-trees',
          title: 'Binary Trees & Traversals Mastery Quiz',
          category: 'topic',
          relatedSubjectOrCompany: 'Data Structures & Algorithms',
          durationMinutes: 12,
          difficulty: 'Intermediate',
          questions: [
            {
              id: 1,
              question: 'Which traversal of a Binary Search Tree produces elements in non-decreasing sorted order?',
              options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
              correctAnswer: 1,
              explanation: 'In-order traversal visits the left subtree, current node, and right subtree. In a BST, this yields strictly ascending values.'
            },
            {
              id: 2,
              question: 'What is the maximum number of nodes in a binary tree of depth/height h (where root is at height 1)?',
              options: ['2^h - 1', '2^(h-1)', '2^(h+1) - 1', 'h^2'],
              correctAnswer: 0,
              explanation: 'A full binary tree of height h has 1 + 2 + 4 + ... + 2^(h-1) = 2^h - 1 total nodes.'
            },
            {
              id: 3,
              question: 'What is the worst-case search time complexity in an unbalanced, degenerate (skewed) Binary Search Tree of N elements?',
              options: ['O(N)', 'O(log N)', 'O(N log N)', 'O(1)'],
              correctAnswer: 0,
              explanation: 'A skewed BST degenerates into a linked list where every node has only one child, requiring O(N) operations to find an element.'
            },
            {
              id: 4,
              question: 'Which data structure is primarily used to perform Level Order Traversal (BFS) of a binary tree?',
              options: ['Stack', 'Priority Queue', 'Queue', 'Array'],
              correctAnswer: 2,
              explanation: 'Breadth-First Search (BFS) processes nodes level-by-level in FIFO order, requiring a Queue.'
            },
            {
              id: 5,
              question: 'To construct a unique binary tree, which pair of traversals is sufficient?',
              options: ['Pre-order and Post-order', 'In-order and Pre-order', 'Level-order and Post-order', 'None of these'],
              correctAnswer: 1,
              explanation: 'In-order combined with either Pre-order or Post-order can uniquely construct a binary tree because In-order separates left and right subtrees.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems',
    code: 'CS-401',
    icon: 'Cpu',
    description: 'Core concepts including CPU scheduling algorithms, process synchronization, critical section problem, semaphores, deadlocks, and virtual memory paging.',
    semesterHint: '4th Semester',
    recommendedDuration: '3 - 4 Weeks',
    topics: [
      {
        id: 'os-deadlocks-sync',
        subjectId: 'os',
        title: 'Process Synchronization & Deadlocks',
        summary: 'Critical section problem, Peterson’s solution, Mutex vs Semaphore, Coffman conditions for deadlocks, and Banker’s Algorithm for deadlock avoidance.',
        importance: 'Very High',
        frequencyInInterviews: 'Must-know for OS Round & Technical Interviews',
        readTimeMinutes: 14,
        keyConcepts: [
          'Race Condition & Critical Section criteria (Mutual Exclusion, Progress, Bounded Waiting)',
          'Counting Semaphore vs Binary Semaphore (Mutex)',
          'Deadlock Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
          'Resource Allocation Graph (RAG) and Cycle Detection',
          'Banker’s Algorithm: Safe State vs Unsafe State'
        ],
        notesMarkdown: `### 1. The 4 Coffman Conditions for Deadlock
Deadlock occurs if and only if **all 4 conditions** hold simultaneously:
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process must hold at least one resource and wait to acquire additional resources held by other processes.
3. **No Preemption**: Resources cannot be preempted; they are released only voluntarily.
4. **Circular Wait**: A closed chain of processes exists such that each process holds a resource that the next process in the chain requires.

### 2. Banker's Algorithm (Deadlock Avoidance)
- Let $N$ be processes and $M$ be resource types.
- Matrices: \`Allocation[N][M]\`, \`Max[N][M]\`, \`Need[N][M] = Max - Allocation\`, \`Available[M]\`.
- A state is **SAFE** if there exists a process execution sequence $\\langle P_1, P_2, \\dots, P_n \\rangle$ such that each $P_i$'s need can be satisfied by current Available + resources released by previous processes.`,
        cheatSheetPoints: [
          'Deadlock Prevention: Disallow at least one of the four Coffman conditions.',
          'Deadlock Avoidance: System assesses safety dynamically (Banker’s Algorithm).',
          'Deadlock Detection & Recovery: Allow deadlock to occur, detect via wait-for graph, terminate process or preempt resource.',
          'Mutex is ownership-based (only locker can unlock). Semaphore is signaling mechanism.'
        ],
        youtubeVideos: [
          {
            title: 'Deadlock in Operating System - Coffman Conditions & Banker’s Algorithm',
            channel: 'Gate Smashers',
            views: '3.8M views',
            duration: '22m',
            youtubeId: 'rWFH6blbw6U',
            url: 'https://www.youtube.com/watch?v=rWFH6blbw6U',
            topicHighlight: 'Crystal clear exam-oriented explanation of Banker’s Algorithm with solved numericals.'
          },
          {
            title: 'Semaphores and Mutex in OS - Producer Consumer Problem',
            channel: 'Knowledge Gate',
            views: '1.2M views',
            duration: '28m',
            youtubeId: 'ukM_zzrIeXs',
            url: 'https://www.youtube.com/watch?v=ukM_zzrIeXs',
            topicHighlight: 'Step-by-step breakdown of wait() and signal() primitives and bounded buffer.'
          }
        ],
        quiz: {
          id: 'quiz-os-deadlocks',
          title: 'OS Concurrency & Deadlocks Quiz',
          category: 'topic',
          relatedSubjectOrCompany: 'Operating Systems',
          durationMinutes: 10,
          difficulty: 'Intermediate',
          questions: [
            {
              id: 1,
              question: 'How many Coffman conditions must hold simultaneously for a system deadlock to occur?',
              options: ['All 4 conditions', 'Any 1 condition', 'At least 2 conditions', 'Exactly 3 conditions'],
              correctAnswer: 0,
              explanation: 'Deadlock can only occur if Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait all occur at the same time.'
            },
            {
              id: 2,
              question: 'In Banker’s Algorithm, if a system is in an "Unsafe State", what does it strictly imply?',
              options: ['The system is definitely deadlocked right now', 'A deadlock is possible, but not guaranteed', 'All processes have terminated', 'CPU utilization is 0%'],
              correctAnswer: 1,
              explanation: 'An unsafe state does not necessarily mean a deadlock has occurred; it means the system cannot guarantee that deadlock will be avoided if processes request max resources.'
            },
            {
              id: 3,
              question: 'What is the primary difference between a Mutex and a Binary Semaphore?',
              options: ['A Mutex has no binary state', 'A Semaphore can only be used on Windows', 'A Mutex has an ownership concept (only thread that locked can unlock it)', 'Binary semaphore can hold integer values up to 100'],
              correctAnswer: 2,
              explanation: 'A Mutex is an ownership lock; only the thread that acquired the lock can release it. Semaphores are signaling variables that can be signaled by any thread.'
            },
            {
              id: 4,
              question: 'Which CPU scheduling algorithm can lead to starvation for long running processes?',
              options: ['Shortest Job First (SJF / SRTF)', 'Round Robin with small quantum', 'First-Come, First-Served (FCFS)', 'Fair Share Scheduling'],
              correctAnswer: 0,
              explanation: 'In SJF/SRTF, if shorter processes continuously arrive in the ready queue, longer processes will wait indefinitely (starvation).'
            },
            {
              id: 5,
              question: 'Aging is a technique used in operating systems to resolve which of the following problems?',
              options: ['Thrashing', 'Starvation', 'Internal Fragmentation', 'Page Faults'],
              correctAnswer: 1,
              explanation: 'Aging gradually increases the priority of processes that wait in the system for a long time, preventing indefinite starvation.'
            }
          ]
        }
      },
      {
        id: 'os-memory-paging',
        subjectId: 'os',
        title: 'Virtual Memory, Paging & Page Replacement',
        summary: 'Logical vs Physical addresses, Page Tables, Translation Lookaside Buffer (TLB), Page Fault handling, and LRU / FIFO / Optimal page replacement algorithms.',
        importance: 'High',
        frequencyInInterviews: 'Asked in Core CS & Systems interviews',
        readTimeMinutes: 12,
        keyConcepts: [
          'Logical Address (Page number + Offset) to Physical Address (Frame number + Offset)',
          'TLB Hit ratio and Effective Memory Access Time (EMAT)',
          'Page Fault Trap sequence',
          'Page Replacement Algorithms: FIFO, Optimal (Belady’s algorithm), LRU',
          'Belady’s Anomaly: FIFO causing more page faults with more frames'
        ],
        notesMarkdown: `### 1. Address Translation
$$\\text{Effective Access Time (EAT)} = h \\cdot (t_{\\text{TLB}} + t_m) + (1-h) \\cdot (t_{\\text{TLB}} + 2 \\cdot t_m)$$
where $h$ is the TLB hit ratio, $t_{\\text{TLB}}$ is TLB access time, and $t_m$ is main memory access time.

### 2. Page Replacement
- **FIFO**: First-In-First-Out. Suffers from **Belady's Anomaly** (increasing page frames can increase page faults).
- **Optimal (OPT)**: Replace the page that will not be used for the longest period of time in the future. (Theoretical benchmark).
- **LRU**: Least Recently Used. Approximates Optimal by looking back in time. Free from Belady's Anomaly (Stack algorithm).`,
        cheatSheetPoints: [
          'Internal Fragmentation occurs with paging; External Fragmentation occurs with segmentation.',
          'Thrashing occurs when the system spends more time servicing page faults than executing processes.',
          'Stack algorithms (LRU, Optimal) never experience Belady’s anomaly.'
        ],
        youtubeVideos: [
          {
            title: 'Paging and Page Tables in Operating System with Numerical',
            channel: 'Gate Smashers',
            views: '2.9M views',
            duration: '18m',
            youtubeId: 'pJ6qrCB8pDw',
            url: 'https://www.youtube.com/watch?v=pJ6qrCB8pDw',
            topicHighlight: 'How CPU translates 32-bit and 64-bit virtual addresses to physical RAM frames.'
          }
        ],
        quiz: {
          id: 'quiz-os-paging',
          title: 'Virtual Memory & Page Replacement Quiz',
          category: 'topic',
          relatedSubjectOrCompany: 'Operating Systems',
          durationMinutes: 10,
          difficulty: 'Intermediate',
          questions: [
            {
              id: 1,
              question: 'Which page replacement algorithm is known to suffer from Belady’s Anomaly?',
              options: ['LRU (Least Recently Used)', 'FIFO (First-In, First-Out)', 'Optimal Page Replacement', 'MRU (Most Recently Used)'],
              correctAnswer: 1,
              explanation: 'Belady’s anomaly is the phenomenon in which increasing the number of page frames results in an increase in the number of page faults for certain memory access patterns under FIFO.'
            },
            {
              id: 2,
              question: 'What is the purpose of the Translation Lookaside Buffer (TLB)?',
              options: ['To store backup files', 'Fast hardware cache to speed up virtual-to-physical address translation', 'To handle disk interrupts', 'To schedule CPU processes'],
              correctAnswer: 1,
              explanation: 'The TLB is a high-speed associative hardware cache that stores recent mappings of virtual page numbers to physical frame numbers.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'dbms',
    name: 'Database Management Systems',
    code: 'CS-402',
    icon: 'Database',
    description: 'Relational data models, SQL queries, B+ Trees indexing, functional dependencies, 1NF to BCNF normalization, ACID properties, and serializability.',
    semesterHint: '4th Semester',
    recommendedDuration: '3 - 4 Weeks',
    topics: [
      {
        id: 'dbms-normalization-sql',
        subjectId: 'dbms',
        title: 'Normalization (1NF to BCNF) & SQL Queries',
        summary: 'Decomposition, functional dependencies, identifying Candidate Keys, anomalies (insertion, deletion, update), and writing advanced SQL joins and window functions.',
        importance: 'Very High',
        frequencyInInterviews: 'Asked in 90% of Tech Interviews',
        readTimeMinutes: 16,
        keyConcepts: [
          'First Normal Form (1NF): Atomic attributes only',
          'Second Normal Form (2NF): 1NF + No Partial Dependency ($X \\to Y$ where $X$ is proper subset of candidate key)',
          'Third Normal Form (3NF): 2NF + No Transitive Dependency ($X \\to Y$ where $X$ is superkey OR $Y$ is prime attribute)',
          'Boyce-Codd Normal Form (BCNF): For every $X \\to Y$, $X$ MUST be a Super Key',
          'SQL: GROUP BY, HAVING, INNER/LEFT/RIGHT JOIN, and Subqueries'
        ],
        notesMarkdown: `### 1. Normalization Checklist
| Normal Form | Rule Requirement |
| :--- | :--- |
| **1NF** | Each column values must be atomic (no arrays/repeating groups). |
| **2NF** | In 1NF + No partial dependency (non-prime attributes fully dependent on candidate key). |
| **3NF** | In 2NF + For every $X \\to A$, either $X$ is a Super Key or $A$ is a Prime Attribute. |
| **BCNF** | Stricter 3NF: For every $X \\to A$, $X$ must be a Super Key. |

### 2. Frequently Asked SQL Interview Queries
**Find N-th Highest Salary:**
\`\`\`sql
SELECT DISTINCT salary 
FROM Employee 
ORDER BY salary DESC 
LIMIT 1 OFFSET (N - 1);
\`\`\`
**Using Dense Rank Window Function:**
\`\`\`sql
WITH RankedSalaries AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank_pos
    FROM Employee
)
SELECT salary FROM RankedSalaries WHERE rank_pos = 2;
\`\`\``,
        cheatSheetPoints: [
          'Candidate Key is minimal super key.',
          'BCNF is always dependency preserving? NO, BCNF decomposition may lose functional dependencies.',
          '3NF decomposition is ALWAYS lossless and dependency preserving.',
          'HAVING filters groups created by GROUP BY, whereas WHERE filters individual rows before grouping.'
        ],
        youtubeVideos: [
          {
            title: 'Normalization in DBMS - 1NF, 2NF, 3NF, BCNF with Solved Examples',
            channel: 'Gate Smashers',
            views: '4.2M views',
            duration: '35m',
            youtubeId: 'xoTyrCTffvg',
            url: 'https://www.youtube.com/watch?v=xoTyrCTffvg',
            topicHighlight: 'Finding candidate keys from functional dependencies with clear shortcut tricks.'
          }
        ],
        quiz: {
          id: 'quiz-dbms-normalization',
          title: 'DBMS Normalization & Relational Schema',
          category: 'topic',
          relatedSubjectOrCompany: 'Database Management Systems',
          durationMinutes: 10,
          difficulty: 'Intermediate',
          questions: [
            {
              id: 1,
              question: 'A relation R is in BCNF if for every functional dependency X -> Y:',
              options: ['Y is a prime attribute', 'X is a candidate key / super key', 'X is a foreign key', 'Y is a primary key'],
              correctAnswer: 1,
              explanation: 'In Boyce-Codd Normal Form (BCNF), the determinant X must strictly be a Super Key for every non-trivial functional dependency X -> Y.'
            },
            {
              id: 2,
              question: 'Which of the following normal form decompositions is guaranteed to be both Lossless-Join and Dependency-Preserving?',
              options: ['3NF', 'BCNF', '4NF', '5NF'],
              correctAnswer: 0,
              explanation: 'Decomposition into 3NF is always guaranteed to be lossless and dependency-preserving, whereas BCNF may not always preserve functional dependencies.'
            },
            {
              id: 3,
              question: 'What is the main difference between WHERE and HAVING clauses in SQL?',
              options: ['WHERE is used for numbers, HAVING for strings', 'WHERE filters rows before aggregation; HAVING filters aggregated groups', 'HAVING cannot be used without JOIN', 'They are completely synonymous'],
              correctAnswer: 1,
              explanation: 'WHERE filters rows before grouping/aggregating, while HAVING filters aggregated group results after GROUP BY.'
            },
            {
              id: 4,
              question: 'What is a Partial Dependency?',
              options: ['When a primary key depends on a foreign key', 'When a non-prime attribute depends on only a proper subset of a candidate key', 'When two tables share no keys', 'When a table has NULL values'],
              correctAnswer: 1,
              explanation: 'Partial dependency occurs when a non-prime attribute is functionally dependent on part of a composite candidate key rather than the whole key.'
            },
            {
              id: 5,
              question: 'What property in ACID guarantees that all operations of a transaction are completed or none are?',
              options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
              correctAnswer: 0,
              explanation: 'Atomicity (the "all-or-nothing" property) guarantees that either the entire transaction succeeds and is committed, or it is rolled back completely.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    code: 'CS-501',
    icon: 'Network',
    description: 'OSI 7-layer model, TCP/IP protocol suite, subnetting & CIDR, routing algorithms, transport protocols (TCP 3-way handshake vs UDP), DNS, and HTTP/HTTPS.',
    semesterHint: '5th Semester',
    recommendedDuration: '3 Weeks',
    topics: [
      {
        id: 'cn-osi-tcp',
        subjectId: 'cn',
        title: 'OSI Model, TCP/IP & Transport Protocols',
        summary: 'Comprehensive analysis of layers, TCP 3-way handshake, TCP connection teardown, TCP flow control (Sliding Window), congestion control, and TCP vs UDP comparisons.',
        importance: 'High',
        frequencyInInterviews: 'Asked in 85% of Tech Rounds',
        readTimeMinutes: 12,
        keyConcepts: [
          'OSI 7 Layers (Physical, Data Link, Network, Transport, Session, Presentation, Application)',
          'TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK',
          'TCP Connection Teardown: 4-Way FIN/ACK exchange',
          'TCP vs UDP: Connection-oriented vs Connectionless, Reliable vs Unreliable, Overhead',
          'What happens when you type a URL into a browser address bar?'
        ],
        notesMarkdown: `### 1. TCP 3-Way Handshake
1. **Client $\\to$ Server**: Client sends \`SYN\` packet with initial sequence number $ISN_C$.
2. **Server $\\to$ Client**: Server responds with \`SYN-ACK\` packet with $ISN_S$ and acknowledgment number $ISN_C + 1$.
3. **Client $\\to$ Server**: Client sends \`ACK\` with acknowledgment number $ISN_S + 1$. Connection is now ESTABLISHED.

### 2. "What happens when you type google.com and press Enter?"
1. **Browser Cache & OS DNS**: Check local cache $\\to$ query local DNS resolver.
2. **Recursive DNS Resolution**: Root server $\\to$ TLD (.com) $\\to$ Authoritative Name Server $\\to$ returns IP.
3. **ARP (Address Resolution Protocol)**: Maps destination IP to MAC address of gateway router.
4. **TCP Handshake**: 3-way SYN, SYN-ACK, ACK.
5. **TLS/SSL Handshake**: Negotiate encryption keys, certificates verification for HTTPS.
6. **HTTP GET Request**: Browser sends HTTP request, server parses and returns HTTP response (HTML, CSS, JS).
7. **DOM Rendering**: Browser engine parses HTML, constructs DOM/CSSOM, paints pixels.`,
        cheatSheetPoints: [
          'Transport Layer provides process-to-process delivery using Port numbers.',
          'Network Layer provides host-to-host delivery using IP addresses.',
          'Data Link Layer provides hop-to-hop (node-to-node) delivery using MAC addresses.',
          'TCP Header size is 20 - 60 bytes; UDP Header size is fixed at 8 bytes.'
        ],
        youtubeVideos: [
          {
            title: 'TCP 3-Way Handshake & Connection Termination Explained',
            channel: 'Computerphile',
            views: '1.9M views',
            duration: '16m',
            youtubeId: 'F27PLuhGoSk',
            url: 'https://www.youtube.com/watch?v=F27PLuhGoSk',
            topicHighlight: 'Packet traces showing SYN, ACK, Sequence numbers, and Wireshark inspection.'
          }
        ],
        quiz: {
          id: 'quiz-cn-transport',
          title: 'Computer Networks & Protocols Quiz',
          category: 'topic',
          relatedSubjectOrCompany: 'Computer Networks',
          durationMinutes: 10,
          difficulty: 'Intermediate',
          questions: [
            {
              id: 1,
              question: 'In TCP 3-way handshake, what packet flags are sent by the server to the client in step 2?',
              options: ['SYN', 'ACK', 'SYN + ACK', 'FIN + ACK'],
              correctAnswer: 2,
              explanation: 'The server acknowledges the client’s SYN and sends its own synchronize request in a combined SYN-ACK packet.'
            },
            {
              id: 2,
              question: 'Which layer of the OSI model is responsible for converting IP addresses to MAC addresses?',
              options: ['Network Layer using ARP (Data Link / Network interface)', 'Application Layer', 'Transport Layer', 'Presentation Layer'],
              correctAnswer: 0,
              explanation: 'ARP (Address Resolution Protocol) operates between Network and Data Link layers to resolve IPv4 addresses to physical MAC addresses.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'oops',
    name: 'Object-Oriented Programming (OOPs)',
    code: 'CS-302',
    icon: 'Boxes',
    description: 'Encapsulation, Abstraction, Inheritance, Polymorphism (compile-time vs runtime), Virtual Functions, vptr/vtbl, and standard Design Patterns.',
    semesterHint: '3rd Semester',
    recommendedDuration: '2 - 3 Weeks',
    topics: [
      {
        id: 'oops-four-pillars',
        subjectId: 'oops',
        title: 'The 4 Pillars of OOPs & Design Patterns',
        summary: 'Deep dive into encapsulation, abstraction, inheritance, runtime polymorphism (virtual functions), abstract classes vs interfaces, and Singleton / Factory design patterns.',
        importance: 'Very High',
        frequencyInInterviews: 'Asked in almost every campus interview round',
        readTimeMinutes: 11,
        keyConcepts: [
          'Encapsulation (Data hiding using access specifiers)',
          'Abstraction (Hiding implementation details via Interfaces & Abstract classes)',
          'Inheritance (Code reusability & IS-A relationship)',
          'Polymorphism: Function Overloading (Static) vs Function Overriding with virtual keywords (Dynamic)',
          'Virtual Table (vtable) and Virtual Pointer (vptr) internals in C++/Java'
        ],
        notesMarkdown: `### 1. The 4 Pillars
1. **Encapsulation**: Binding data members and member functions into a single unit (class) and restricting direct access using \`private\`, \`protected\`, \`public\`.
2. **Abstraction**: Displaying only essential features and hiding internal complexities. Achieved via Abstract Classes and Interfaces.
3. **Inheritance**: Deriving new classes from existing classes to achieve code reusability (IS-A relationship).
4. **Polymorphism**:
   - **Compile-time**: Method Overloading, Operator Overloading.
   - **Run-time**: Method Overriding via \`virtual\` functions (Dynamic Dispatch).

### 2. Singleton Design Pattern (Thread-safe)
\`\`\`java
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;
    private DatabaseConnection() {} // private constructor

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}
\`\`\``,
        cheatSheetPoints: [
          'Virtual destructor is required when deleting a derived class object through a base class pointer to avoid memory leak.',
          'Interface cannot have instance variables; all methods are public abstract by default.',
          'Diamond problem in multiple inheritance is resolved using virtual base classes in C++ or Interfaces in Java.'
        ],
        youtubeVideos: [
          {
            title: 'Object Oriented Programming (OOPs) in One Video',
            channel: 'Apna College',
            views: '3.6M views',
            duration: '1h 30m',
            youtubeId: 'bSrm9RXwBaI',
            url: 'https://www.youtube.com/watch?v=bSrm9RXwBaI',
            topicHighlight: 'Hands-on C++ and Java code examples for all 4 OOPs pillars and interview traps.'
          }
        ],
        quiz: {
          id: 'quiz-oops-pillars',
          title: 'OOPs Principles & Design Patterns Quiz',
          category: 'topic',
          relatedSubjectOrCompany: 'Object-Oriented Programming (OOPs)',
          durationMinutes: 10,
          difficulty: 'Intermediate',
          questions: [
            {
              id: 1,
              question: 'Which mechanism enables runtime polymorphism in C++?',
              options: ['Virtual Functions and Dynamic Dispatch', 'Function Overloading', 'Templates', 'Static member variables'],
              correctAnswer: 0,
              explanation: 'Virtual functions allow the program to decide which overridden implementation to call at runtime based on the actual object type using vptr and vtable.'
            },
            {
              id: 2,
              question: 'Why should a Base class destructor always be declared virtual in C++ if polymorphism is used?',
              options: ['To speed up compilation', 'To ensure the Derived class destructor is called when deleting an object through a Base class pointer', 'It is mandatory syntax in C++20', 'To make constructor virtual'],
              correctAnswer: 1,
              explanation: 'Without a virtual destructor, deleting a derived class instance via a base pointer only calls the base destructor, leaking derived class resources.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'aptitude',
    name: 'Quantitative Aptitude & Reasoning',
    code: 'APT-101',
    icon: 'Calculator',
    description: 'Time & Work, Speed & Distance, Percentages, Profit & Loss, Syllogisms, Blood Relations, and Data Interpretation for company Online Assessments (OA).',
    semesterHint: 'Pre-Placement Trimester',
    recommendedDuration: '3 Weeks',
    topics: [
      {
        id: 'apt-work-speed',
        subjectId: 'aptitude',
        title: 'Time & Work, Pipes & Cisterns, Speed & Distance',
        summary: 'Formula-based and efficiency LCM shortcuts for solving tricky time and work problems, relative speed, trains, and boats & streams.',
        importance: 'Very High',
        frequencyInInterviews: 'Mandatory in 100% of Company Round 1 OAs',
        readTimeMinutes: 10,
        keyConcepts: [
          'Work = Rate × Time (LCM method for finding Total Work units)',
          'Pipes & Cisterns: Inlet (+) and Outlet (-) filling/emptying rates',
          'Relative Speed: Same direction ($S_1 - S_2$), Opposite direction ($S_1 + S_2$)',
          'Boats & Streams: Downstream speed ($u + v$), Upstream speed ($u - v$)'
        ],
        notesMarkdown: `### 1. The LCM Method for Time & Work
- If A completes work in 10 days and B in 15 days:
  - Take $\\text{LCM}(10, 15) = 30$ units (Total Work).
  - Efficiency of A = $30 / 10 = 3$ units/day.
  - Efficiency of B = $30 / 15 = 2$ units/day.
  - Combined efficiency = $3 + 2 = 5$ units/day.
  - Days needed together = $30 / 5 = 6$ days.

### 2. Relative Speed Shortcuts
- Units Conversion: $1 \\text{ km/h} = \\frac{5}{18} \\text{ m/s}$.
- Distance = Speed $\\times$ Time.
- Train crossing a pole/person: Distance = Length of Train.
- Train crossing a platform/bridge: Distance = Length of Train + Length of Platform.`,
        cheatSheetPoints: [
          'If A is twice as efficient as B, ratio of time taken $T_A : T_B = 1 : 2$.',
          'Average Speed for equal distances traveled at speeds $x$ and $y$ is $\\frac{2xy}{x+y}$.'
        ],
        youtubeVideos: [
          {
            title: 'Time and Work Shortcuts and Tricks in 20 Minutes',
            channel: 'Feel Free to Learn',
            views: '5.1M views',
            duration: '21m',
            youtubeId: 'KE7tQf9spPg',
            url: 'https://www.youtube.com/watch?v=KE7tQf9spPg',
            topicHighlight: 'Fast mental math and LCM tricks for high-speed OA clearing.'
          }
        ],
        quiz: {
          id: 'quiz-apt-work',
          title: 'Aptitude & Speed Math OA Challenge',
          category: 'topic',
          relatedSubjectOrCompany: 'Quantitative Aptitude & Reasoning',
          durationMinutes: 10,
          difficulty: 'Intermediate',
          questions: [
            {
              id: 1,
              question: 'A can do a piece of work in 12 days, and B can do it in 24 days. How many days will they take together?',
              options: ['6 days', '8 days', '10 days', '18 days'],
              correctAnswer: 1,
              explanation: 'Total work = LCM(12, 24) = 24 units. A rate = 2 units/day, B rate = 1 unit/day. Combined rate = 3 units/day. Days = 24 / 3 = 8 days.'
            },
            {
              id: 2,
              question: 'A train 150m long is running at 54 km/h. How many seconds will it take to cross an electric post?',
              options: ['8 seconds', '10 seconds', '12 seconds', '15 seconds'],
              correctAnswer: 1,
              explanation: 'Speed in m/s = 54 * (5/18) = 15 m/s. Time = Distance / Speed = 150 / 15 = 10 seconds.'
            }
          ]
        }
      }
    ]
  }
];

export const COMPANY_PROFILES: CompanyProfile[] = [
  {
    id: 'google',
    name: 'Google',
    tier: 'Product / Tier-1',
    logoText: 'G',
    badgeColor: 'bg-red-500 text-white',
    avgPackage: '₹35 - ₹65 LPA',
    highestPackage: '₹1.15 Cr (International / Off-Campus)',
    description: 'Global tech leader looking for strong algorithm foundations, scalable system design, clean clean code, and cultural "Googliness".',
    eligibility: {
      minCGPA: 7.5,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EE', 'Mathematics & Computing'],
      backlogsAllowed: 0
    },
    roles: [
      'Software Development Engineer (SDE)',
      'Data Analyst & Insights Specialist',
      'Cloud Solutions Engineer',
      'Site Reliability Engineer (SRE)'
    ],
    hiringProcess: [
      {
        roundNumber: 1,
        title: 'Online Coding Challenge',
        duration: '90 Minutes',
        description: '2 to 3 LeetCode Medium/Hard algorithmic problems on Google internal platform.',
        focusAreas: ['Graphs', 'Dynamic Programming', 'Trie & HashMaps', 'Greedy']
      },
      {
        roundNumber: 2,
        title: 'Technical Interview 1 (DSA & Problem Solving)',
        duration: '45 - 60 Minutes',
        description: 'Live coding on Google Docs or collaborative editor without syntax highlighting.',
        focusAreas: ['Edge Case Identification', 'Time/Space Analysis', 'Clean Modular Code']
      },
      {
        roundNumber: 3,
        title: 'Technical Interview 2 (Data Structures & Systems)',
        duration: '45 - 60 Minutes',
        description: 'Complex problem solving, tree/graph algorithms, and concurrency fundamentals.',
        focusAreas: ['Tree Traversals', 'Shortest Paths', 'Memory Constraints']
      },
      {
        roundNumber: 4,
        title: 'Googliness & Leadership (Behavioral)',
        duration: '45 Minutes',
        description: 'Assessing collaboration, dealing with ambiguity, ethics, and growth mindset.',
        focusAreas: ['STAR Behavioral Scenarios', 'Peer Conflict Resolution', 'Curiosity']
      }
    ],
    pyqs: [
      {
        id: 'goog-pyq-1',
        role: 'Software Development Engineer (SDE)',
        year: '2024 - 2025',
        round: 'Technical Round 1',
        title: 'Find Median from Data Stream (Continuous Stream)',
        difficulty: 'Hard',
        frequency: 'Asked 14+ times',
        question: 'Design a data structure that supports adding integer numbers from an incoming continuous stream and finding the median of all elements seen so far in O(1) time.',
        sampleInputOutput: 'Input: addNum(1), addNum(2), findMedian() -> 1.5, addNum(3), findMedian() -> 2',
        approach: 'Maintain two priority queues (heaps): a max-heap for the lower half of numbers and a min-heap for the upper half. Keep heaps balanced such that the size difference is at most 1.',
        codeSolution: `class MedianFinder {
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.peek();
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
        language: 'Java',
        tags: ['Heaps', 'Data Stream', 'Design']
      },
      {
        id: 'goog-pyq-2',
        role: 'Software Development Engineer (SDE)',
        year: '2024',
        round: 'Online Assessment (OA)',
        title: 'Word Ladder (Shortest Transformation Sequence)',
        difficulty: 'Hard',
        frequency: 'Asked 11+ times',
        question: 'Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord where each step changes only one letter and every intermediate word is in wordList.',
        approach: 'Model words as vertices in an unweighted graph where an edge exists between two words with Hamming distance = 1. Run Breadth-First Search (BFS) to find the shortest path.',
        tags: ['BFS', 'Graph', 'Shortest Path']
      },
      {
        id: 'goog-pyq-3',
        role: 'Data Analyst & Insights Specialist',
        year: '2024',
        round: 'Technical Round 1',
        title: 'Monthly Active Users Retention & Cohort Analysis in SQL',
        difficulty: 'Medium',
        frequency: 'Asked 9+ times',
        question: 'Write a SQL query to calculate Month-over-Month user retention percentage given a table of user login activities with user_id and login_date.',
        approach: 'Extract login year-month using DATE_TRUNC, self-join on consecutive months with user_id match, and divide retained users by active users of previous month.',
        tags: ['SQL', 'Window Functions', 'Retention']
      }
    ],
    mockQuiz: {
      id: 'quiz-google-mock',
      title: 'Google SDE Online Assessment Practice Mock',
      category: 'company',
      relatedSubjectOrCompany: 'Google',
      durationMinutes: 15,
      difficulty: 'Advanced',
      questions: [
        {
          id: 1,
          question: 'What is the optimal time complexity to find the median of a continuous data stream using two heaps?',
          options: ['O(1) insertion, O(N) lookup', 'O(log N) insertion, O(1) lookup', 'O(N) insertion, O(1) lookup', 'O(log N) insertion, O(log N) lookup'],
          correctAnswer: 1,
          explanation: 'Adding a number takes O(log N) due to heap rebalancing, while finding the median only examines top elements in O(1).'
        },
        {
          id: 2,
          question: 'In Google coding rounds, what is the best strategy if you do not immediately know the optimal solution?',
          options: ['Stay silent until the optimal solution hits you', 'State the brute-force approach clearly, analyze its complexity, and explain your thought process to optimize it', 'Ask the interviewer to give you the answer', 'Write code immediately without talking'],
          correctAnswer: 1,
          explanation: 'Google interviewers assess problem-solving communication, clarity, and incremental optimization over silent perfection.'
        }
      ]
    },
    tipsFromSeniors: [
      'Always talk out loud before writing a single line of code. Google values thought process over instant code.',
      'Check edge cases explicitly: null pointers, single element, negative numbers, duplicate numbers, integer overflow.',
      'Know your time and space complexity with solid Big-O mathematical justifications.'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tier: 'Product / Tier-1',
    logoText: 'MS',
    badgeColor: 'bg-blue-600 text-white',
    avgPackage: '₹22 - ₹48 LPA',
    highestPackage: '₹55 LPA',
    description: 'Renowned for rigorous technical rounds on Data Structures, OOPs system design, debugging skills, and growth mindset culture.',
    eligibility: {
      minCGPA: 7.0,
      allowedBranches: ['All Engineering Branches eligible for general test'],
      backlogsAllowed: 0
    },
    roles: [
      'Software Development Engineer (SDE)',
      'Support Engineer & Azure Cloud Specialist',
      'Data Scientist',
      'Program Manager / Product Analyst'
    ],
    hiringProcess: [
      {
        roundNumber: 1,
        title: 'Codility / Mettl Online Assessment',
        duration: '90 Minutes',
        description: '3 coding questions testing arrays, graphs, and dynamic programming.',
        focusAreas: ['DSA', 'Boundary Conditions', 'Corner Cases']
      },
      {
        roundNumber: 2,
        title: 'Technical Round 1 (Problem Solving & DSA)',
        duration: '60 Minutes',
        description: 'Live coding on Linked Lists, Binary Trees, and String manipulations.',
        focusAreas: ['Memory Management', 'Pointers', 'Recursion']
      },
      {
        roundNumber: 3,
        title: 'Technical Round 2 (Low Level Design & OOPs)',
        duration: '60 Minutes',
        description: 'Object-oriented modeling (e.g. Design Parking Lot, Elevator System, LRU Cache).',
        focusAreas: ['SOLID Principles', 'Design Patterns', 'Extensibility']
      },
      {
        roundNumber: 4,
        title: 'AA (As Appropriate) / Director Round',
        duration: '45 Minutes',
        description: 'Senior leader testing culture fit, passion for technology, and project deep dives.',
        focusAreas: ['Resume Projects', 'Cloud Fundamentals', 'Growth Mindset']
      }
    ],
    pyqs: [
      {
        id: 'ms-pyq-1',
        role: 'Software Development Engineer (SDE)',
        year: '2024 - 2025',
        round: 'Technical Round 1',
        title: 'Design and Implement LRU Cache (Least Recently Used)',
        difficulty: 'Medium',
        frequency: 'Asked 20+ times',
        question: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with get(key) and put(key, value) operations running in O(1) average time complexity.',
        approach: 'Combine a Doubly Linked List with a HashMap. The HashMap provides O(1) key lookup, while the Doubly Linked List allows O(1) removal and insertion at head/tail.',
        tags: ['HashMap', 'Doubly Linked List', 'Design']
      },
      {
        id: 'ms-pyq-2',
        role: 'Software Development Engineer (SDE)',
        year: '2024',
        round: 'Technical Round 2',
        title: 'Spiral Matrix Traversal',
        difficulty: 'Medium',
        frequency: 'Asked 15+ times',
        question: 'Given an m x n matrix, return all elements of the matrix in spiral order (top row, right column, bottom row, left column).',
        approach: 'Maintain 4 boundary pointers: top, bottom, left, right. Traverse boundaries sequentially while updating pointers until boundaries cross.',
        tags: ['Matrix', 'Pointers', 'Simulation']
      }
    ],
    mockQuiz: {
      id: 'quiz-ms-mock',
      title: 'Microsoft SDE Technical Readiness Mock',
      category: 'company',
      relatedSubjectOrCompany: 'Microsoft',
      durationMinutes: 12,
      difficulty: 'Intermediate',
      questions: [
        {
          id: 1,
          question: 'Which combination of data structures gives O(1) get and O(1) put operations for an LRU cache?',
          options: ['Array + Stack', 'HashMap + Doubly Linked List', 'Binary Search Tree + Queue', 'Min Heap + Hash Set'],
          correctAnswer: 1,
          explanation: 'HashMap gives instant O(1) key lookup to a node, while a Doubly Linked List allows O(1) node detachment and moving to the front.'
        }
      ]
    },
    tipsFromSeniors: [
      'Microsoft loves Low-Level Design (LLD). Be ready to design a Parking Lot, Chess Game, or Elevator using SOLID principles.',
      'Be ready to explain the architecture and tradeoffs of every single project on your resume.'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tier: 'Product / Tier-1',
    logoText: 'AMZ',
    badgeColor: 'bg-amber-500 text-white',
    avgPackage: '₹28 - ₹45 LPA',
    highestPackage: '₹48 LPA',
    description: 'Heavily tests Leadership Principles (LP) integrated directly into technical interviews alongside high-volume LeetCode medium/hard challenges.',
    eligibility: {
      minCGPA: 6.5,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
      backlogsAllowed: 0
    },
    roles: [
      'Software Development Engineer (SDE 1)',
      'Cloud Support Associate (AWS)',
      'Business Intelligence Engineer (BIE)',
      'Data Analyst'
    ],
    hiringProcess: [
      {
        roundNumber: 1,
        title: 'Online Assessment (OA 1 + OA 2)',
        duration: '105 Minutes',
        description: '2 Coding questions + Work Styles Assessment (Amazon Leadership Principles simulation).',
        focusAreas: ['Arrays & Strings', 'Trees & Graphs', 'Customer Obsession']
      },
      {
        roundNumber: 2,
        title: 'Technical Round 1 (Problem Solving & LP)',
        duration: '60 Minutes',
        description: '15 mins on Leadership Principles (STAR method) + 45 mins DSA coding.',
        focusAreas: ['Ownership', 'Bias for Action', 'DFS/BFS/Trees']
      },
      {
        roundNumber: 3,
        title: 'Technical Round 2 (Algorithms & Data Structures)',
        duration: '60 Minutes',
        description: 'Dynamic programming, priority queues, graph connectivity + 1 Leadership question.',
        focusAreas: ['Invent and Simplify', 'Deep Dive', 'DP on Strings/Subsequences']
      },
      {
        roundNumber: 4,
        title: 'Bar Raiser Round',
        duration: '60 Minutes',
        description: 'Cross-team senior interviewer evaluating cultural fit and high technical standards.',
        focusAreas: ['Deliver Results', 'Are Right, A Lot', 'Resilience']
      }
    ],
    pyqs: [
      {
        id: 'amz-pyq-1',
        role: 'Software Development Engineer (SDE 1)',
        year: '2024 - 2025',
        round: 'Online Assessment (OA)',
        title: 'Amazon Fresh / Rotten Oranges (Multi-source BFS)',
        difficulty: 'Medium',
        frequency: 'Asked 22+ times',
        question: 'Given an m x n grid containing fresh oranges (1), rotten oranges (2), and empty cells (0), return the minimum number of minutes that must elapse until no cell has a fresh orange. If impossible, return -1.',
        approach: 'Add all initially rotten oranges to a Queue. Run Multi-source Breadth First Search (BFS) level by level. Each level represents 1 elapsed minute. Decrement fresh orange count as neighbors rot.',
        tags: ['BFS', 'Matrix', 'Queue']
      },
      {
        id: 'amz-pyq-2',
        role: 'Software Development Engineer (SDE 1)',
        year: '2024',
        round: 'Technical Round 1',
        title: 'Top K Frequent Elements / Words in E-Commerce Catalog',
        difficulty: 'Medium',
        frequency: 'Asked 18+ times',
        question: 'Given an integer array nums and an integer k, return the k most frequent elements in O(N log K) or O(N) time.',
        approach: 'Count frequencies with a HashMap, then maintain a Min-Heap of size K (cost: O(N log K)) or use Bucket Sort based on frequency counts (cost: O(N)).',
        tags: ['Heap', 'Bucket Sort', 'HashMap']
      }
    ],
    mockQuiz: {
      id: 'quiz-amazon-oa',
      title: 'Amazon SDE-1 OA Online Assessment Mock',
      category: 'company',
      relatedSubjectOrCompany: 'Amazon',
      durationMinutes: 15,
      difficulty: 'Intermediate',
      questions: [
        {
          id: 1,
          question: 'Which algorithm is optimal for finding the shortest time for rotten oranges to spread in an m x n grid?',
          options: ['Depth First Search (DFS)', 'Multi-Source Breadth First Search (BFS)', 'Dijkstra’s Algorithm with Weights', 'Binary Search'],
          correctAnswer: 1,
          explanation: 'Rot spreads simultaneously from all rotten cells every minute, which is the textbook definition of multi-source BFS with unweighted edges.'
        },
        {
          id: 2,
          question: 'Which Amazon Leadership Principle emphasizes making fast, calculated decisions without waiting for 100% complete data?',
          options: ['Customer Obsession', 'Bias for Action', 'Frugality', 'Hire and Develop the Best'],
          correctAnswer: 1,
          explanation: 'Bias for Action: Speed matters in business. Many decisions and actions are reversible and do not need extensive study.'
        }
      ]
    },
    tipsFromSeniors: [
      'Never skip the Leadership Principles! 50% of the hiring decision at Amazon is based on LP STAR stories.',
      'Prepare 2 real stories for each of the top 6 LPs: Customer Obsession, Ownership, Bias for Action, Dive Deep, Earn Trust, and Deliver Results.'
    ]
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    tier: 'Mass / IT Services',
    logoText: 'TCS',
    badgeColor: 'bg-purple-600 text-white',
    avgPackage: '₹3.6 - ₹9.0 LPA',
    highestPackage: '₹11.5 LPA (TCS Prime)',
    description: 'India’s largest IT services recruiter with 3 distinct hiring tracks via TCS NQT: Ninja (3.6 LPA), Digital (7.0 LPA), and Prime (9.0+ LPA).',
    eligibility: {
      minCGPA: 6.0,
      allowedBranches: ['All B.Tech / B.E Branches eligible'],
      backlogsAllowed: 1
    },
    roles: [
      'TCS Prime Developer (9 LPA)',
      'TCS Digital Innovator (7 LPA)',
      'TCS Ninja Software Engineer (3.6 LPA)',
      'System Engineer'
    ],
    hiringProcess: [
      {
        roundNumber: 1,
        title: 'TCS NQT (National Qualifier Test)',
        duration: '180 Minutes',
        description: 'Foundation section (Numerical, Verbal, Reasoning) + Advanced Coding (2 problems for Digital/Prime).',
        focusAreas: ['Aptitude', 'Data Interpretation', 'Basic/Advanced Coding']
      },
      {
        roundNumber: 2,
        title: 'Technical + Managerial + HR Interview (TR + MR + HR)',
        duration: '30 - 45 Minutes',
        description: 'Single combined or sequential interview covering B.Tech final year project, basic C/Java/Python, DBMS, and relocation willingness.',
        focusAreas: ['B.Tech Major Project', 'SQL Queries', 'OOPs Basics', 'Willingness to Relocate']
      }
    ],
    pyqs: [
      {
        id: 'tcs-pyq-1',
        role: 'TCS Digital Innovator (7 LPA)',
        year: '2024 - 2025',
        round: 'Online Assessment (OA)',
        title: 'Toggle String & Palindromic Transformations',
        difficulty: 'Easy',
        frequency: 'Asked 35+ times',
        question: 'Write a program in C/Java/Python to replace all lowercase vowels with their immediate next uppercase consonants and check if the transformed string is a palindrome.',
        approach: 'Traverse string, verify vowel membership, replace characters according to ASCII offset, and compare with reverse using two pointers.',
        tags: ['Strings', 'Implementation', 'ASCII']
      },
      {
        id: 'tcs-pyq-2',
        role: 'TCS Prime Developer (9 LPA)',
        year: '2024',
        round: 'Online Assessment (OA)',
        title: 'Minimum Coins / Greedy Currency Dispenser',
        difficulty: 'Medium',
        frequency: 'Asked 25+ times',
        question: 'Given an infinite supply of currency denominations and a target amount, calculate the minimum coins required and detect if an exact change cannot be formed.',
        approach: 'Use Dynamic Programming 1D array \`dp[amount]\` initialized to $\\infty$, with base case \`dp[0] = 0\`.',
        tags: ['Dynamic Programming', 'Coin Change']
      }
    ],
    mockQuiz: {
      id: 'quiz-tcs-nqt',
      title: 'TCS NQT National Qualifier Test Mock',
      category: 'company',
      relatedSubjectOrCompany: 'Tata Consultancy Services (TCS)',
      durationMinutes: 15,
      difficulty: 'Beginner',
      questions: [
        {
          id: 1,
          question: 'What is the minimum criteria to be elevated to the TCS Digital/Prime interview round from NQT?',
          options: ['Clear only verbal aptitude', 'Score high in Advanced Quantitative and solve both Advanced Coding questions', 'Having 9.5+ CGPA', 'Skipping negative marking questions'],
          correctAnswer: 1,
          explanation: 'TCS segregates candidates based on performance in the Advanced section (Advanced Aptitude + 2 Coding Problems).'
        }
      ]
    },
    tipsFromSeniors: [
      'Do not get stuck on any one aptitude question; NQT has strict section-wise timing.',
      'Be confident about your college major project; TCS interviewers always ask you to explain your architecture and individual contribution.'
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    tier: 'Mass / IT Services',
    logoText: 'INFY',
    badgeColor: 'bg-sky-700 text-white',
    avgPackage: '₹3.6 - ₹9.5 LPA',
    highestPackage: '₹9.5 LPA (Specialist Programmer)',
    description: 'Hires through InfyTQ and HackWithInfy competitions for Specialist Programmer (SP) and Digital Specialist Engineer (DSE) roles.',
    eligibility: {
      minCGPA: 6.0,
      allowedBranches: ['All Engineering Branches'],
      backlogsAllowed: 0
    },
    roles: [
      'Specialist Programmer (SP - 9.5 LPA)',
      'Digital Specialist Engineer (DSE - 6.25 LPA)',
      'Systems Engineer (3.6 LPA)'
    ],
    hiringProcess: [
      {
        roundNumber: 1,
        title: 'HackWithInfy / Assessment Test',
        duration: '180 Minutes',
        description: '3 Algorithmic problems ranging from Medium to Hard.',
        focusAreas: ['Dynamic Programming', 'Graph Theory', 'Greedy Strategies']
      },
      {
        roundNumber: 2,
        title: 'Technical Interview',
        duration: '45 Minutes',
        description: 'Live coding explanation, DSA optimization, and Database queries.',
        focusAreas: ['Coding explanations', 'Database normalization', 'OOPs']
      }
    ],
    pyqs: [
      {
        id: 'infy-pyq-1',
        role: 'Specialist Programmer (SP - 9.5 LPA)',
        year: '2024',
        round: 'Technical Round 1',
        title: '0/1 Knapsack Problem with Item Selection Reconstruction',
        difficulty: 'Medium',
        frequency: 'Asked 20+ times',
        question: 'Given weights and values of n items, find the maximum value that can be put in a knapsack of capacity W and print the indices of all included items.',
        approach: 'Build standard 2D DP table \`dp[n+1][W+1]\`. Backtrack from \`dp[n][W]\` to reconstruct included items.',
        tags: ['Dynamic Programming', 'Backtracking']
      }
    ],
    mockQuiz: {
      id: 'quiz-infosys-mock',
      title: 'Infosys DSE / SP Coding Assessment Mock',
      category: 'company',
      relatedSubjectOrCompany: 'Infosys',
      durationMinutes: 12,
      difficulty: 'Intermediate',
      questions: [
        {
          id: 1,
          question: 'In HackWithInfy, how many coding problems must typically be solved completely to qualify for Specialist Programmer (9.5 LPA)?',
          options: ['0 problems', 'At least 2 to 3 problems completely with all test cases passed', 'Only verbal questions', '1 basic question partially'],
          correctAnswer: 1,
          explanation: 'Specialist Programmer cutoffs require solving at least 2 full problems with 100% test cases passed.'
        }
      ]
    },
    tipsFromSeniors: [
      'Master Dynamic Programming on Grids and Subsets to crack the HackWithInfy rounds.',
      'Practice writing clean code without relying on IDE autocomplete.'
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    tier: 'Mass / IT Services',
    logoText: 'ACN',
    badgeColor: 'bg-indigo-600 text-white',
    avgPackage: '₹4.5 - ₹6.5 LPA',
    highestPackage: '₹8.5 LPA',
    description: 'Hires for Associate Software Engineer (ASE) and Advanced Associate Software Engineer (AASE) with cognitive, technical, and coding rounds.',
    eligibility: {
      minCGPA: 6.5,
      allowedBranches: ['All Engineering Disciplines'],
      backlogsAllowed: 0
    },
    roles: [
      'Advanced Associate Software Engineer (AASE - 6.5 LPA)',
      'Associate Software Engineer (ASE - 4.5 LPA)',
      'Data & Analytics Associate'
    ],
    hiringProcess: [
      {
        roundNumber: 1,
        title: 'Cognitive & Technical Assessment',
        duration: '90 Minutes',
        description: 'English ability, Critical Thinking, Abstract Reasoning, Common Application & MS Office, Pseudo-code, Networking, Security.',
        focusAreas: ['Pseudo-code debugging', 'Cognitive ability', 'Cloud basics']
      },
      {
        roundNumber: 2,
        title: 'Coding Assessment (Immediately after Round 1)',
        duration: '45 Minutes',
        description: '2 hands-on coding questions (Easy - Medium).',
        focusAreas: ['Arrays', 'String manipulation', 'Mathematical logic']
      },
      {
        roundNumber: 3,
        title: 'Communication Assessment',
        duration: '20 Minutes',
        description: 'AI-evaluated voice assessment testing pronunciation, listening, and speaking fluency.',
        focusAreas: ['Fluency', 'Active listening', 'Sentence mastery']
      }
    ],
    pyqs: [
      {
        id: 'acn-pyq-1',
        role: 'Advanced Associate Software Engineer (AASE - 6.5 LPA)',
        year: '2024',
        round: 'Online Assessment (OA)',
        title: 'Difference of Sum of Numbers Divisible and Not Divisible by M',
        difficulty: 'Easy',
        frequency: 'Asked 40+ times',
        question: 'Given integers n and m, calculate the difference between the sum of integers from 1 to m that are not divisible by n and the sum of integers that are divisible by n.',
        approach: 'Loop from 1 to m, check modulo $i \\% n == 0$. Add to sum1 or sum2, return $|sum1 - sum2|$.',
        tags: ['Math', 'Implementation']
      }
    ],
    mockQuiz: {
      id: 'quiz-accenture-mock',
      title: 'Accenture Pseudo-Code & Technical Assessment',
      category: 'company',
      relatedSubjectOrCompany: 'Accenture',
      durationMinutes: 10,
      difficulty: 'Beginner',
      questions: [
        {
          id: 1,
          question: 'What is evaluated in the Accenture automated Communication Assessment round?',
          options: ['Only coding syntax', 'Pronunciation, fluency, sentence construction, and listening comprehension', 'SQL queries', 'Aptitude formulas'],
          correctAnswer: 1,
          explanation: 'Accenture uses an automated voice assessment system that scores verbal clarity, pace, pronunciation, and listening accuracy.'
        }
      ]
    },
    tipsFromSeniors: [
      'Practice pseudo-code questions heavily (bitwise XOR, nested while loops, variable scoping).',
      'Wear a noise-canceling headset for the automated communication round.'
    ]
  },
  {
    id: 'goldmansachs',
    name: 'Goldman Sachs',
    tier: 'FinTech / Investment',
    logoText: 'GS',
    badgeColor: 'bg-blue-800 text-white',
    avgPackage: '₹24 - ₹40 LPA',
    highestPackage: '₹52 LPA',
    description: 'Premier global financial institution with high-bar math puzzles, probability, advanced data structures, and multi-threading CS rounds.',
    eligibility: {
      minCGPA: 7.0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EE', 'Math & Computing', 'Mechanical'],
      backlogsAllowed: 0
    },
    roles: [
      'Engineering Analyst (SDE)',
      'Quantitative Strategist / Quant Analyst',
      'Cybersecurity & Risk Engineer'
    ],
    hiringProcess: [
      {
        roundNumber: 1,
        title: 'HackerRank Aptitude & Math Test',
        duration: '90 Minutes',
        description: 'Advanced Math, Probability, Permutations, CS fundamentals, and 2 Coding challenges.',
        focusAreas: ['Probability & Puzzles', 'DSA', 'Time/Space Complexity']
      },
      {
        roundNumber: 2,
        title: 'Technical Round 1 (Data Structures & Math)',
        duration: '60 Minutes',
        description: 'Deep dive into Tree algorithms, Linked list manipulations, and probability brain teasers.',
        focusAreas: ['Binary Search on Answer', 'Graph Algorithms', 'Puzzles']
      },
      {
        roundNumber: 3,
        title: 'Technical Round 2 (System Design & Concurrency)',
        duration: '60 Minutes',
        description: 'Low-latency concepts, memory allocation, multi-threading, and object-oriented design.',
        focusAreas: ['Multi-threading', 'Locks & Mutexes', 'Garbage Collection']
      }
    ],
    pyqs: [
      {
        id: 'gs-pyq-1',
        role: 'Engineering Analyst (SDE)',
        year: '2024',
        round: 'Technical Round 1',
        title: 'Trapping Rain Water with Elevation Map',
        difficulty: 'Hard',
        frequency: 'Asked 16+ times',
        question: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining in O(N) time and O(1) space.',
        approach: 'Use two pointers (left = 0, right = n-1) with leftMax and rightMax variables. Move the pointer with the smaller max inward.',
        tags: ['Two Pointers', 'Array', 'Rain Water']
      }
    ],
    mockQuiz: {
      id: 'quiz-gs-mock',
      title: 'Goldman Sachs Quant & DSA Technical Challenge',
      category: 'company',
      relatedSubjectOrCompany: 'Goldman Sachs',
      durationMinutes: 15,
      difficulty: 'Advanced',
      questions: [
        {
          id: 1,
          question: 'What is the expected number of coin tosses required to get two consecutive Heads with a fair coin?',
          options: ['4', '6', '8', '2'],
          correctAnswer: 1,
          explanation: 'Using Markov states: E = 1/2(1 + E_H) + 1/2(1 + E); E_H = 1/2(1) + 1/2(1 + E). Solving yields E = 6.'
        }
      ]
    },
    tipsFromSeniors: [
      'Brush up on classic interview puzzles (25 Horses race, 3 light switches, 100 prisoners problem).',
      'Goldman interviewers love testing memory layout, pointer arithmetic, and concurrency.'
    ]
  }
];

export const INTERVIEW_ROLES_GUIDE: InterviewRoleGuidance[] = [
  {
    role: 'Software Development Engineer (SDE / SWE)',
    icon: 'Code2',
    description: 'Responsible for end-to-end design, development, unit testing, and deployment of scalable software systems and backend services.',
    coreSkills: [
      'Proficiency in Java, C++, Python, or Go',
      'Advanced Data Structures (Trees, Graphs, DP)',
      'System Architecture & Database Schema Design',
      'Clean Code, Unit Testing & Git Workflows',
      'REST APIs and Microservices Fundamentals'
    ],
    typicalRounds: [
      'Round 1: Online Coding Assessment (OA)',
      'Round 2: Data Structures & Algorithms Problem Solving',
      'Round 3: Core CS (OS, DBMS, Networks) + Low Level Design (LLD)',
      'Round 4: Behavioral & Engineering Leadership'
    ],
    frequentQuestions: [
      {
        question: 'How do you design a URL shortening service like Bit.ly?',
        expectedDepth: 'Explain hash algorithms (Base62 encoding), database choice (NoSQL vs SQL), distributed ID generation, caching with Redis, and collision handling.',
        modelAnswerKeypoints: [
          'Calculate scale: e.g. 100M URLs per day requires ~3.5 billion IDs per month.',
          'Use 7 characters in Base62 ($62^7 \\approx 3.5$ trillion unique keys).',
          'Use Distributed Counter (Twitter Snowflake or ZooKeeper range allocation) to avoid collisions.',
          'Cache frequently accessed links using Redis with LRU eviction.'
        ]
      },
      {
        question: 'What is the difference between Synchronous and Asynchronous execution?',
        expectedDepth: 'Clear distinction between blocking I/O calls and non-blocking event loops, worker threads, and message queues (Kafka, RabbitMQ).',
        modelAnswerKeypoints: [
          'Synchronous: Caller waits until function returns result before continuing.',
          'Asynchronous: Caller registers callback or promise, continues execution without blocking thread.',
          'Improves throughput for I/O bound operations.'
        ]
      }
    ]
  },
  {
    role: 'Data Analyst & Business Intelligence Specialist',
    icon: 'BarChart3',
    description: 'Extracts actionable insights from enterprise data warehouses using advanced SQL, Python/Pandas, visualization dashboards, and statistical models.',
    coreSkills: [
      'Advanced SQL (Window Functions, CTEs, Self-Joins)',
      'Python (Pandas, NumPy, Matplotlib/Seaborn)',
      'Data Visualization (Tableau, PowerBI)',
      'Hypothesis Testing & A/B Testing Metrics',
      'Data Cleansing & ETL Pipeline Basics'
    ],
    typicalRounds: [
      'Round 1: SQL & Aptitude Assessment',
      'Round 2: Live SQL Query Writing & Data Modeling',
      'Round 3: Case Study & Product Sense Metrics',
      'Round 4: HR & Business Communication'
    ],
    frequentQuestions: [
      {
        question: 'How would you measure the success of a newly launched feature on an e-commerce platform?',
        expectedDepth: 'Define North Star metric, primary conversion rates, secondary guardrail metrics, and statistical significance via A/B testing.',
        modelAnswerKeypoints: [
          'Primary Metric: Click-through-rate (CTR) or Checkout completion rate.',
          'Guardrail Metric: App crash rate, average page load time, cart abandonment rate.',
          'Sample size calculation and 95% confidence interval ($p < 0.05$).'
        ]
      }
    ]
  },
  {
    role: 'Cloud & DevOps Engineer',
    icon: 'Cloud',
    description: 'Manages CI/CD pipelines, container orchestration with Kubernetes/Docker, cloud infrastructure on AWS/GCP/Azure, and site reliability.',
    coreSkills: [
      'Linux Command Line & Bash/Python Scripting',
      'Docker & Containerization',
      'Kubernetes Pods, Services, and Deployments',
      'CI/CD Workflows (GitHub Actions, Jenkins)',
      'AWS / GCP Infrastructure as Code (Terraform)'
    ],
    typicalRounds: [
      'Round 1: Linux & Networking Assessment',
      'Round 2: Scripting & Containerization Live Tasks',
      'Round 3: Cloud Architecture & Troubleshooting Scenarios',
      'Round 4: Culture & Team Fit'
    ],
    frequentQuestions: [
      {
        question: 'Explain the difference between a Docker Image and a Docker Container.',
        expectedDepth: 'Image is a read-only immutable template with application layers. Container is a running instance with a writable container layer.',
        modelAnswerKeypoints: [
          'Docker image = blueprint (immutable, built via Dockerfile).',
          'Docker container = living process running in an isolated namespace/cgroup.',
          'Containers share the host OS kernel unlike full virtual machines.'
        ]
      }
    ]
  }
];

export const HR_QUESTIONS_GUIDE: HRQuestionGuide[] = [
  {
    id: 'hr-1',
    question: 'Tell me about yourself and walk me through your resume.',
    category: 'Icebreaker',
    interviewerIntent: 'To assess verbal fluency, confidence, career narrative, and your ability to pitch yourself in 90 seconds without reciting every line on the resume.',
    starMethodApproach: {
      situation: 'Current education background and primary technical passion (e.g. final year B.Tech in CSE at DTU).',
      task: 'The key domain or problem area you have specialized in (Full Stack, DSA, Cloud systems).',
      action: 'Highlighted 1 or 2 proudest achievements (e.g. built a real-world MERN app used by 500+ students, solved 400+ LeetCode problems).',
      result: 'Why you are enthusiastic about this specific company and role.'
    },
    sampleAnswer: '“Good morning! I am Arjun, currently in my final year of B.Tech in Computer Science at DTU. Over the past four years, I have developed a strong passion for scalable software engineering and distributed systems. Recently, I led a team to build a peer-to-peer campus marketplace that processed over 1,200 transactions during college festivals. In addition to coursework, I have actively solved over 450 algorithmic problems on LeetCode and completed an internship optimizing backend APIs at TechCorp. I have been closely following your engineering team’s recent work on microservices modernization, and I am excited about the opportunity to contribute my skills to your SDE team.”',
    redFlagsToAvoid: [
      'Do not start from primary school or kindergarten.',
      'Do not read your resume verbatim.',
      'Do not mention personal hobbies like "playing video games" unless relevant to the engineering position.'
    ]
  },
  {
    id: 'hr-2',
    question: 'Why do you want to join our company instead of other recruiters?',
    category: 'Culture Fit',
    interviewerIntent: 'To check whether you did research on the company products, values, recent tech announcements, or if you are applying blindly to every job.',
    starMethodApproach: {
      situation: 'Acknowledge the company’s industry footprint and specific tech products that impressed you.',
      task: 'Identify a specific challenge or mission the company has that resonates with your career aspirations.',
      action: 'Mention how your personal values and skills align with their engineering culture.',
      result: 'Show long-term commitment and enthusiasm.'
    },
    sampleAnswer: '“What really stands out to me about your company is your commitment to engineering excellence at planetary scale. While researching, I read your engineering blog post on how your team reduced latency by 35% through custom caching architectures. In my own academic projects, optimizing query performance was what I enjoyed most. Joining your team would provide the perfect environment to learn from world-class senior architects while delivering meaningful impact to millions of end-users.”',
    redFlagsToAvoid: [
      'Saying "Because you give a high salary package and brand name".',
      'Giving generic flattery that applies to any random company.'
    ]
  },
  {
    id: 'hr-3',
    question: 'Describe a situation where a project failed or you encountered a major obstacle. How did you resolve it?',
    category: 'Behavioral',
    interviewerIntent: 'Assessing resilience, accountability, problem-solving under pressure, and emotional maturity (never blaming others).',
    starMethodApproach: {
      situation: 'During the college hackathon, our real-time notification engine crashed 2 hours before the final demonstration.',
      task: 'As the backend lead, I had to identify the root cause immediately without panicking the team.',
      action: 'I inspected server logs, identified a memory leak in WebSocket connection pooling, quickly rolled back the unneeded listener, and implemented exponential backoff.',
      result: 'The system stabilized, we demonstrated the prototype without glitches, and won 2nd runner-up out of 60 teams.'
    },
    sampleAnswer: '“During our annual 36-hour hackathon, our application crashed 2 hours before presentation due to an unhandled memory leak in our WebSocket pool under load. Rather than pointing fingers, I asked my team to pause new commits while I attached memory profilers. We identified circular references holding onto closed socket connections. Within 45 minutes, we patched the listener cleanup and implemented exponential backoff. We deployed the fix and demoed successfully, securing 2nd place. It taught me the critical importance of load testing and graceful degradation.”',
    redFlagsToAvoid: [
      'Saying "I have never failed at anything in my life".',
      'Blaming teammates, college professors, or bad internet.'
    ]
  },
  {
    id: 'hr-4',
    question: 'Where do you see yourself in 3 to 5 years?',
    category: 'Situational',
    interviewerIntent: 'Testing stability, ambition, commitment to technical growth, and realistic career trajectories.',
    starMethodApproach: {
      situation: 'Starting out as an enthusiastic junior software engineer eager to absorb production best practices.',
      task: 'Developing deep domain mastery in software design, clean code, and cloud architectures.',
      action: 'Taking ownership of full modules, mentoring incoming freshers, and contributing to system architecture.',
      result: 'Transitioning into a Senior SDE / Tech Lead who drives business impact.'
    },
    sampleAnswer: '“In the next 3 to 5 years, my goal is to transition from an enthusiastic graduate into a dependable Senior Software Engineer who can take ambiguous requirements and architect robust, fault-tolerant solutions. In the first 1-2 years, I want to master your codebase, CI/CD pipelines, and internal tools. By year 4 or 5, I aim to lead critical technical features, mentor newer engineers, and contribute to architectural decisions that support your product roadmap.”',
    redFlagsToAvoid: [
      'Saying "I want to do an MBA and leave the company in 1 year".',
      'Saying "I want to be the CEO of your company" (sounds arrogant).'
    ]
  }
];

export const INITIAL_RESUME_DATA: ResumeData = {
  fullName: 'Arjun Verma',
  email: 'arjun.verma@example.com',
  phone: '+91 98765 43210',
  location: 'New Delhi, India',
  linkedin: 'linkedin.com/in/arjunverma-dev',
  github: 'github.com/arjunverma-codes',
  portfolio: 'arjunverma.dev',
  summary: 'Motivated B.Tech Computer Science student with strong foundations in Data Structures, Algorithms, Distributed Backend Systems, and Full-Stack Web Development. Solved 450+ LeetCode problems and built production-ready applications with React, Node.js, and PostgreSQL.',
  education: [
    {
      id: 'edu-1',
      institution: 'Delhi Technological University (DTU)',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      startYear: '2021',
      endYear: '2025',
      cgpa: '8.82 / 10.0'
    },
    {
      id: 'edu-2',
      institution: 'Delhi Public School, R.K. Puram',
      degree: 'Class XII (CBSE)',
      field: 'Science (PCM + Computer Science)',
      startYear: '2019',
      endYear: '2021',
      cgpa: '96.4%'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Innovations',
      role: 'Software Engineering Intern',
      location: 'Bengaluru, India (Remote)',
      startDate: 'May 2024',
      endDate: 'July 2024',
      current: false,
      bullets: [
        'Architected and deployed 14 RESTful API endpoints using Node.js and Express, cutting average response latency by 28%.',
        'Implemented Redis caching for frequent catalog lookups, reducing database query overhead by 40% during peak flash sales.',
        'Collaborated with a cross-functional team of 6 engineers using Git, agile sprints, and automated CI/CD pipelines via GitHub Actions.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Distributed Real-Time Collaborative Code Editor',
      technologies: 'React, TypeScript, WebSockets, Node.js, Redis, Docker',
      githubUrl: 'https://github.com/arjunverma-codes/collaborative-editor',
      liveUrl: 'https://collabcode.demo.app',
      bullets: [
        'Engineered an operational transformation (OT) engine supporting concurrent editing for up to 50 active users per document.',
        'Leveraged WebSockets for sub-50ms synchronized updates and deployed containerized microservices on AWS EC2 with Nginx reverse proxy.',
        'Achieved 99.8% uptime during live demonstration in the university tech festival.'
      ]
    },
    {
      id: 'proj-2',
      title: 'Algorithmic Stock Trading Simulator & Portfolio Tracker',
      technologies: 'Python, FastAPI, PostgreSQL, TailwindCSS, Chart.js',
      githubUrl: 'https://github.com/arjunverma-codes/stock-sim',
      bullets: [
        'Designed real-time trade simulation handling order matching using custom binary search trees and priority queues.',
        'Integrated Yahoo Finance API with automated background cron tasks to ingest tick data for 100+ equities.'
      ]
    }
  ],
  skills: [
    {
      category: 'Programming Languages',
      items: 'C++, Java, Python, JavaScript (ES6+), TypeScript, SQL'
    },
    {
      category: 'Frameworks & Libraries',
      items: 'React.js, Node.js, Express.js, Next.js, Tailwind CSS, FastAPI'
    },
    {
      category: 'Databases & Tools',
      items: 'PostgreSQL, MongoDB, Redis, Docker, Git & GitHub, Postman, Linux/Bash'
    },
    {
      category: 'Core Computer Science',
      items: 'Data Structures & Algorithms, Object-Oriented Programming (OOPs), Operating Systems, DBMS, Computer Networks, System Design'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      year: '2024'
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      year: '2023'
    }
  ]
};
