-- Date: 2020-01-21

alter table reviews
add unique (user_id, chip_id);

-- Date: 2020-01-22
alter table geos_chips
add unique (geo_id, chip_id);

create index reviews_chip_id_idx on reviews(chip_id);


select
            c.id,
            c.title,
            c.created_at,
            c.created_by,
            avg(r.rating) as rating,
            count(r.rating) as num_of_reviews,
            -- ranking is rating (but weighted down if 1 or 2 reviews)
            coalesce(avg(r.rating), 0) * 
              case 
                when count(r.rating) = 1 then 0.5
                when count(r.rating) = 2 then 0.75
                else 1 end
              as ranking
          from chips c
          left join reviews r on r.chip_id = c.id
          group by c.id
          order by coalesce(avg(r.rating), 0) * 
              case 
                when count(r.rating) = 1 then 0.5
                when count(r.rating) = 2 then 0.75
                else 1 
              end 
          desc;
