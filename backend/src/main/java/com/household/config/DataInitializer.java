package com.household.config;

import com.household.model.Task;
import com.household.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        taskRepository.deleteAll();
        
        // Create sample tasks for the current month
        LocalDate today = LocalDate.now();
        int currentMonth = today.getMonthValue();
        int currentYear = today.getYear();
        
        Task creditCard = new Task();
        creditCard.setTitle("Credit Card Bill Payment");
        creditCard.setDescription("Pay monthly credit card bill");
        creditCard.setDueDate(LocalDate.of(currentYear, currentMonth, 15));
        creditCard.setPaid(false);
        creditCard.setRecurring(true);
        creditCard.setCategory("Bills");
        creditCard.setAmount(850.0);
        taskRepository.save(creditCard);
        
        Task kidsClasses = new Task();
        kidsClasses.setTitle("Kids Classes Booking");
        kidsClasses.setDescription("Book swimming and music classes for next month");
        kidsClasses.setDueDate(LocalDate.of(currentYear, currentMonth, 25));
        kidsClasses.setPaid(false);
        kidsClasses.setRecurring(true);
        kidsClasses.setCategory("Education");
        kidsClasses.setAmount(300.0);
        taskRepository.save(kidsClasses);
        
        Task carInsurance = new Task();
        carInsurance.setTitle("Car Insurance Payment");
        carInsurance.setDescription("Monthly car insurance premium");
        carInsurance.setDueDate(LocalDate.of(currentYear, currentMonth, 10));
        carInsurance.setPaid(false);
        carInsurance.setRecurring(true);
        carInsurance.setCategory("Insurance");
        carInsurance.setAmount(180.0);
        taskRepository.save(carInsurance);
        
        Task rentersInsurance = new Task();
        rentersInsurance.setTitle("Renters Insurance Payment");
        rentersInsurance.setDescription("Monthly renters insurance premium");
        rentersInsurance.setDueDate(LocalDate.of(currentYear, currentMonth, 5));
        rentersInsurance.setPaid(false);
        rentersInsurance.setRecurring(true);
        rentersInsurance.setCategory("Insurance");
        rentersInsurance.setAmount(45.0);
        taskRepository.save(rentersInsurance);
        
        Task rent = new Task();
        rent.setTitle("Rent Payment");
        rent.setDescription("Monthly rent payment");
        rent.setDueDate(LocalDate.of(currentYear, currentMonth, 1));
        rent.setPaid(false);
        rent.setRecurring(true);
        rent.setCategory("Housing");
        rent.setAmount(2200.0);
        taskRepository.save(rent);
        
        Task utilityBill = new Task();
        utilityBill.setTitle("Utility Bill Payment");
        utilityBill.setDescription("Electricity, water, and gas bill");
        utilityBill.setDueDate(LocalDate.of(currentYear, currentMonth, 20));
        utilityBill.setPaid(false);
        utilityBill.setRecurring(true);
        utilityBill.setCategory("Bills");
        utilityBill.setAmount(125.0);
        taskRepository.save(utilityBill);
        
        System.out.println("Sample tasks initialized successfully!");
    }
}
