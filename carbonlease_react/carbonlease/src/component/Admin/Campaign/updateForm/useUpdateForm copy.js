import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findByNo, getCategories } from '../../../../api/campaign/adminCampaignApi';

export default function useUpdateForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        campaignTitle: '',
        categoryNo: '',
        campaignContent: '',
        thumbnailFile: null,
        detailImageFile: null,
        startDate: '',
        endDate: ''
    });
    const [fileNames, setFileNames] = useState({
        thumbnail: '',
        detailImage: ''
    });
    const [errors, setErrors] = useState({});
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        getCategories().then((result) => {
            if (result && Array.isArray(result.data)) {
                setCategoryOptions(
                    result.data.map(c => ({
                        value: String(c.categoryNo),
                        label: c.categoryName
                    }))
                );
            }
        });

        if (id) {
            findByNo(id).then(res => {
                const campaign = res.data;
                let patched = { ...campaign };
                patched.categoryNo = String(
                    campaign.category && campaign.category.categoryNo !== undefined
                        ? campaign.category.categoryNo
                        : campaign.categoryNo ?? ''
                );
                let thumb = null;
                let detail = null;
                if (Array.isArray(campaign.attachments)) {
                    thumb = campaign.attachments.find(a => a && a.fileLevel === 0);
                    detail = campaign.attachments.find(a => a && a.fileLevel === 1);
                    patched.thumbnailUrl = thumb ? getFullImageUrl(thumb.filePath) : '';
                    patched.detailImageUrl = detail ? getFullImageUrl(detail.filePath) : '';
                }
                setFormData(prev => ({
                    ...prev,
                    ...patched
                }));
                setFileNames({
                    thumbnail: thumb && thumb.filePath ? thumb.filePath.split('/').pop() : '',
                    detailImage: detail && detail.filePath ? detail.filePath.split('/').pop() : ''
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
            const fileType = name === 'thumbnailFile' ? 'thumbnail' : 'detailImage';
            setFileNames(prev => ({
                ...prev,
                [fileType]: files[0].name
            }));
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.campaignTitle.trim()) {
            newErrors.campaignTitle = '제목을 입력해주세요.';
        }
        if (!formData.categoryNo) {
            newErrors.categoryNo = '카테고리를 선택해주세요.';
        }
        if (!formData.campaignContent.trim()) {
            newErrors.campaignContent = '내용을 입력해주세요.';
        }
        if (!formData.startDate) {
            newErrors.startDate = '시작일을 선택해주세요.';
        }
        if (!formData.endDate) {
            newErrors.endDate = '종료일을 선택해주세요.';
        }
        if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
            newErrors.endDate = '종료일은 시작일 이후여야 합니다.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        // TODO: API 호출 로직
        console.log('Form submitted:', formData);
        console.log('캠페인 ID:', id);
        // navigate('/admin/campaigns');
    };

    const handleCancel = () => {
        navigate('/admin/campaigns');
    };

    return {
        formData,
        setFormData,
        fileNames,
        setFileNames,
        errors,
        setErrors,
        categoryOptions,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancel
    };
}
