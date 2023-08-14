ALTER TABLE `products` ADD `images` json DEFAULT ('[]');
ALTER TABLE `products` ALTER COLUMN `images` SET DEFAULT ('[{"id":"1","alt":"descriptive alt tag","url":"https://images.unsplash.com/photo-1505409859467-3a796fd5798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}]');
