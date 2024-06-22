import { useState, useEffect } from 'react';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from './bodydata';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    font-size : 13px;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff; /* Changed color to white */
`;

const ActiveStyledLink = styled(StyledLink)`
    color: #fff; /* Ensure color is white */
    background: #6495ED;
    padding: 5px 10px;
    border-radius: 5px;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        const category = searchParams.get('category');
        setActiveCategory(category);
    }, [searchParams]);

    return (
        <>
            <Link to={`/create?category=${activeCategory || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">{activeCategory ? `Create Blog for ${activeCategory}` : "Create Blog"}</StyledButton>
            </Link>
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink
                                to="/"
                                onClick={() => setActiveCategory('')}
                                style={activeCategory === '' ? { color: '#fff', background: '#6495ED', padding: '5px 10px', borderRadius: '5px' } : { color: '#fff' }} // Ensuring white color
                            >
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell>
                                <StyledLink
                                    to={`/?category=${category.type}`}
                                    onClick={() => setActiveCategory(category.type)}
                                    style={activeCategory === category.type ? { color: '#fff', background: '#6495ED', padding: '5px 10px', borderRadius: '5px' } : { color: '#fff' }} // Ensuring white color
                                >
                                    {category.type}
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
};

export default Categories;
