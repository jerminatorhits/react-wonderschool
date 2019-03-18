CREATE TABLE `dependencies` (
  `id` varchar(50) NOT NULL,
  'group' varchar(50) NOT NULL,
  `requiredId` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
