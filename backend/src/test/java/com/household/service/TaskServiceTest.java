package com.household.service;

import com.household.model.Task;
import com.household.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void getAllTasks_returnsTasksFromRepository() {
        List<Task> tasks = List.of(buildTask(1L, "A", false), buildTask(2L, "B", true));
        when(taskRepository.findAllByOrderByDueDateAsc()).thenReturn(tasks);

        List<Task> result = taskService.getAllTasks();

        assertEquals(tasks, result);
        verify(taskRepository).findAllByOrderByDueDateAsc();
    }

    @Test
    void getTaskById_returnsTaskWhenFound() {
        Task task = buildTask(1L, "Pay bills", false);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Optional<Task> result = taskService.getTaskById(1L);

        assertEquals(Optional.of(task), result);
        verify(taskRepository).findById(1L);
    }

    @Test
    void createTask_savesAndReturnsTask() {
        Task task = buildTask(null, "Groceries", false);
        Task savedTask = buildTask(3L, "Groceries", false);
        when(taskRepository.save(task)).thenReturn(savedTask);

        Task result = taskService.createTask(task);

        assertEquals(savedTask, result);
        verify(taskRepository).save(task);
    }

    @Test
    void updateTask_updatesAllMutableFieldsWhenTaskExists() {
        Task existing = buildTask(5L, "Old title", false);
        Task details = buildTask(null, "New title", true);
        details.setDescription("Updated description");
        details.setDueDate(LocalDate.of(2026, 12, 31));
        details.setRecurring(false);
        details.setCategory("Utilities");
        details.setAmount(250.75);

        when(taskRepository.findById(5L)).thenReturn(Optional.of(existing));
        when(taskRepository.save(existing)).thenReturn(existing);

        Task result = taskService.updateTask(5L, details);

        assertSame(existing, result);
        assertEquals("New title", existing.getTitle());
        assertEquals("Updated description", existing.getDescription());
        assertEquals(LocalDate.of(2026, 12, 31), existing.getDueDate());
        assertEquals(true, existing.getPaid());
        assertEquals(false, existing.getRecurring());
        assertEquals("Utilities", existing.getCategory());
        assertEquals(250.75, existing.getAmount());
        verify(taskRepository).findById(5L);
        verify(taskRepository).save(existing);
    }

    @Test
    void updateTask_throwsWhenTaskDoesNotExist() {
        Task details = buildTask(null, "Any", false);
        when(taskRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> taskService.updateTask(99L, details));

        assertEquals("Task not found with id: 99", exception.getMessage());
        verify(taskRepository).findById(99L);
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void toggleTaskCompletion_flipsPaidStatusAndSaves() {
        Task existing = buildTask(8L, "Internet", false);
        when(taskRepository.findById(8L)).thenReturn(Optional.of(existing));
        when(taskRepository.save(existing)).thenReturn(existing);

        Task result = taskService.toggleTaskCompletion(8L);

        assertSame(existing, result);
        assertEquals(true, existing.getPaid());
        verify(taskRepository).findById(8L);
        verify(taskRepository).save(existing);
    }

    @Test
    void toggleTaskCompletion_throwsWhenTaskDoesNotExist() {
        when(taskRepository.findById(77L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> taskService.toggleTaskCompletion(77L));

        assertEquals("Task not found with id: 77", exception.getMessage());
        verify(taskRepository).findById(77L);
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void deleteTask_deletesWhenTaskExists() {
        when(taskRepository.existsById(10L)).thenReturn(true);

        taskService.deleteTask(10L);

        verify(taskRepository).existsById(10L);
        verify(taskRepository).deleteById(10L);
    }

    @Test
    void deleteTask_throwsWhenTaskDoesNotExist() {
        when(taskRepository.existsById(10L)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> taskService.deleteTask(10L));

        assertEquals("Task not found with id: 10", exception.getMessage());
        verify(taskRepository).existsById(10L);
        verify(taskRepository, never()).deleteById(anyLong());
    }

    @Test
    void getTasksByStatus_returnsFilteredTasks() {
        List<Task> paidTasks = List.of(buildTask(1L, "Rent", true));
        when(taskRepository.findByPaid(true)).thenReturn(paidTasks);

        List<Task> result = taskService.getTasksByStatus(true);

        assertEquals(paidTasks, result);
        verify(taskRepository).findByPaid(true);
    }

    @Test
    void getTasksByCategory_returnsFilteredTasks() {
        List<Task> utilityTasks = List.of(buildTask(2L, "Electricity", false));
        when(taskRepository.findByCategory("Utilities")).thenReturn(utilityTasks);

        List<Task> result = taskService.getTasksByCategory("Utilities");

        assertEquals(utilityTasks, result);
        verify(taskRepository).findByCategory("Utilities");
    }

    @Test
    void getOverdueTasks_returnsRepositoryResult() {
        List<Task> overdue = List.of(buildTask(3L, "Water bill", false));
        when(taskRepository.findByDueDateBeforeAndPaidFalse(any(LocalDate.class))).thenReturn(overdue);

        List<Task> result = taskService.getOverdueTasks();

        assertEquals(overdue, result);
        verify(taskRepository).findByDueDateBeforeAndPaidFalse(any(LocalDate.class));
    }

    private Task buildTask(Long id, String title, Boolean paid) {
        Task task = new Task();
        task.setId(id);
        task.setTitle(title);
        task.setDescription("desc");
        task.setDueDate(LocalDate.of(2026, 1, 15));
        task.setPaid(paid);
        task.setRecurring(true);
        task.setCategory("General");
        task.setAmount(100.0);
        return task;
    }
}
