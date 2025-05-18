package com.example.seat_service.repository;

import com.example.seat_service.model.ShowtimeSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShowtimeSeatRepo extends JpaRepository<ShowtimeSeat, Integer> {
    List<ShowtimeSeat> findByShowtimeId(String showtimeId);

    @Query("SELECT s FROM ShowtimeSeat s " +
            "WHERE s.lockExpiredAt IS NOT NULL " +
            "AND s.lockExpiredAt < :now " +
            "AND s.status = com.example.seat_service.util.SeatStatus.RESERVED")
    List<ShowtimeSeat> findSeatsLockedExpired(@Param("now")LocalDateTime now);
}
